import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { otpVerification, userLoggedIn } from "../redux/actions/userAction";
import SelectInput from "../components/common/selectInput";
import TextInput from "../components/common/textInput";
import { postRequest } from "../Authentication/axiosrequest";
import { IsAuthenticated } from "../Authentication/useAuth";
import { CustomCaptch } from "../components/cutomCaptch";
import "./float.css";
import { ROLES } from "../utilities/roles";

export default function SignIn({ auth }: any) {
  const [validated, setValidated] = useState(false);
  const [validatedForm2, setValidatedForm2] = useState(false);
  const [usersData, setUsersData] = useState<any>([]);

  const [timer, setTimer] = useState(0);

  const [OtpNo, setOtpNo] = useState("");
  const [Role, setRole] = useState("");
  const [Mobile, setMobile] = useState("");
  const [isOtpValidate, setIsOtpValidate] = useState(false);
  const [isbuttonActive, setButtonActive] = useState(false);

  const [captch, setFreshCaptch] = useState("");
  const [captchValue, setCaptchaValue] = useState("");

  const dispatch = useDispatch();

  const [{ Otp }] = IsAuthenticated();
  const [aut] = IsAuthenticated();

  const usersUniqueList: any = Array.from(
    new Set((usersData || []).map((obj: any) => obj?.AssigningType))
  );

  // Countdown timer effect
  useEffect(() => {
    let intervalId: any;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setButtonActive(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (!Mobile) return alert("Enter Mobile");
    if (form.checkValidity() === true) {
      // make it true when you are using api
      event.stopPropagation();
      let res = await postRequest("sendOtpAndCheckRole", { Mobile });
      // let res = {code: 200, };
      if (res.code === 200) {
        setUsersData(res?.data?.assignedData);
        setIsOtpValidate(true);
        setButtonActive(false);
        setTimer(60);
        dispatch(userLoggedIn({ Otp: res?.data?.Otp, Mobile }));
      } else {
        setButtonActive(false);
        alert(res?.response?.data?.message || "Please try again.");
      }
    }
    setValidated(true);
  };
  const handleSubmitOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // make it true when you are using api
      event.stopPropagation();
      if (usersUniqueList?.length > 1) {
        if (!OtpNo) return alert("Provide Otp.");
        if (!Role) return alert("Select Role.");

        let check = OtpNo === Otp;
        if (!check) return alert("Otp Verification Failed.");

        let filterData = usersData.filter(
          (user: any) => user.AssigningType === Role
        );
        if (Role == ROLES.SUPER_ADMIN) {
          // let codes = Array.from(new Set((filterData || []).map((obj: any) => obj.DistrictCode)));
          dispatch(otpVerification({ userRole: Role, userCodes: [] }));
        } else if (Role == ROLES.DISTRICT_OFFICER || Role == ROLES.BBMP_HEAD) {
          // let codes = Array.from(new Set((filterData || []).map((obj: any) => obj.TalukCode)));
          let codes = Array.from(
            new Set((filterData || []).map((obj: any) => obj.DistrictCode))
          );
          dispatch(otpVerification({ userRole: Role, userCodes: codes }));
        } else if (Role == ROLES.TALUK_OFFICER || Role == ROLES.ZONE_OFFICER) {
          // let codes = Array.from(new Set((filterData || []).map((obj: any) => obj.TalukCode)));
          let codes = Array.from(
            new Set((filterData || []).map((obj: any) => obj.TalukCode))
          );
          dispatch(otpVerification({ userRole: Role, userCodes: codes }));
        } else {
          let codes = Array.from(
            new Set((filterData || []).map((obj: any) => obj.GpOrWard))
          );
          dispatch(otpVerification({ userRole: Role, userCodes: codes }));
        }
      } else {
        if (!OtpNo) return alert("Provide Otp.");

        // let originalCaptcha = captch.split(" ").join("");
        // if (captchValue.length !== 6)
        //   return alert("Please Enter Correct Captcha.");
        // // captch checking here
        // if (originalCaptcha !== captchValue)
        //   return alert("Captcha Failed. Please Try Again");

        let check = OtpNo === Otp;
        if (!check) return alert("Otp Verification Failed.");
        let fetchRole = usersData && usersData[0].AssigningType;
        if (fetchRole == ROLES.SUPER_ADMIN) {
          // let codes = Array.from(new Set((usersData || []).map((obj: any) => obj.DistrictCode)));
          dispatch(otpVerification({ userRole: fetchRole, userCodes: [] }));
        } else if (fetchRole == ROLES.DISTRICT_OFFICER || fetchRole === ROLES.BBMP_HEAD) {
          let codes = Array.from(
            new Set((usersData || []).map((obj: any) => obj.DistrictCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        } else if(fetchRole === ROLES.TALUK_OFFICER || ROLES.ZONE_OFFICER){
          let codes = Array.from(
            new Set((usersData || []).map((obj: any) => obj.TalukCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        } else {
          let codes = Array.from(
            new Set((usersData || []).map((obj: any) => obj.GpOrWard))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        }
      }
    }
    setValidatedForm2(true);
  };

  const handleResendOtp = async () => {
    if (!Mobile) return alert("Enter Mobile");
    // make it true when you are using api
    let res = await postRequest("sendOtpAndCheckRole", { Mobile });
    // let res = {code: 200, };
    if (res.code === 200) {
      setUsersData(res?.data?.assignedData);
      setIsOtpValidate(true);
      setButtonActive(false);
      dispatch(userLoggedIn({ Otp: res?.data?.Otp, Mobile }));
    } else {
      setButtonActive(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  return (
    <div className="flex mt-8 justify-center items-center">
      <a className="float">
        <i className="my-float">1.1.4</i>
      </a>
      <Card className="text-center pb-5">
        {!isOtpValidate ? (
          <Form
            noValidate
            className="flex flex-col p-10"
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-4 flex flex-col">
              <span className="pb-2 text-center font-bold">Login</span>
              <TextInput
                controlId="validationCustom03"
                name={"Mobile"}
                placeholder={"Enter Mobile"}
                value={Mobile}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(e.target.value)
                }
              />
            </Row>
            <Button disabled={isbuttonActive} type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <Form
            noValidate
            className="flex flex-col p-10"
            validated={validatedForm2}
            onSubmit={handleSubmitOtp}
          >
            <Row className="mb-4 flex flex-col">
              <span className="pb-2 text-center font-bold">Login</span>
              {(usersUniqueList.length || []) > 1 ? (
                <SelectInput
                  defaultSelect={"Select Role"}
                  options={usersUniqueList}
                  value={Role}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRole(e.target.value)
                  }
                />
              ) : (
                ""
              )}
              <TextInput
                controlId="validationCustom03"
                name={"Mobile"}
                placeholder={"Mobile"}
                value={Mobile}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(e.target.value)
                }
              />
              <TextInput
                controlId="validationCustom03"
                name={"Otp"}
                placeholder={"Enter Otp"}
                value={OtpNo}
                maxLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOtpNo(e.target.value)
                }
              />
              <div className="flex justify-end">
                <a
                  onClick={handleResendOtp}
                  className={`${
                    timer < 1
                      ? "text-red-400 cursor-pointer"
                      : "pointer-events-none text-gray-600"
                  }`}
                >
                  RESEND OTP {timer > 0 && `(${timer})`}
                </a>
              </div>
            </Row>
            <Button disabled={isbuttonActive} color="#269DA5" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
}
