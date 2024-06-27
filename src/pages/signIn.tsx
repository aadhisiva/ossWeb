import React, { useEffect, useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  otpVerification,
  saveUserRolesAndAccess,
  userLoggedIn,
} from "../redux/actions/userAction";
import SelectInput from "../components/common/selectInput";
import TextInput from "../components/common/textInput";
import { postRequest } from "../Authentication/axiosrequest";
import { IsAuthenticated } from "../Authentication/useAuth";
import "./float.css";

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

  const dispatch = useDispatch();

  const [{ Otp }] = IsAuthenticated();

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
      let res = await postRequest("checkRoleAndSendOtp", { Mobile });
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


  const handleSubmitOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      // make it true when you are using api
      event.stopPropagation();
      if (usersUniqueList?.length > 1) {
        let filterData = usersData.filter(
          (user: any) => user?.AssigningType === Role
        );
        if (!Mobile) return alert("Provide Mobile.");
        if (!Role) return alert("Provide Role.");
        let fetchRole = filterData && filterData[0]?.AssigningType;
        let FetchRoleId = filterData && filterData[0]?.RoleId;
  
        let rolesData = await postRequest("getRolesAndAccessData", {
          RoleId: FetchRoleId,
        });
        const accessRole = rolesData?.data?.access[0];
        if (accessRole?.District === "Yes") {
          dispatch(otpVerification({ userRole: fetchRole, userCodes: [] }));

        } else if (accessRole?.TalukorZone === "Yes") {
          let codes = Array.from(
            new Set((filterData || []).map((obj: any) => obj.DistrictCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));

        } else if (accessRole?.GpOrPhc === "Yes") {
          let codes = Array.from(
            new Set((filterData || []).map((obj: any) => obj.TalukCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        } else {
          let codes = Array.from(
            new Set((filterData || []).map((obj: any) => obj.GpCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        }
        dispatch(
          saveUserRolesAndAccess({
            childRoles: rolesData?.data?.roles,
            accessOfMasters: rolesData?.data?.access,
          })
        );
      } else {
        if (!Mobile) return alert("Provide Mobile.");
        if (!OtpNo) return alert("Provide Otp.");

        let check = OtpNo === Otp;
        if (!check) return alert("Otp Verification Failed.");

        let fetchRole = usersData && usersData[0]?.AssigningType;
        let FetchRoleId = usersData && usersData[0]?.RoleId;

        let rolesData = await postRequest("getRolesAndAccessData", {
          RoleId: FetchRoleId,
        });

        const accessRole = rolesData?.data?.access[0];
        if (accessRole?.District === "Yes") {
          dispatch(otpVerification({ userRole: fetchRole, userCodes: [] }));

        } else if (accessRole?.TalukorZone === "Yes") {
          let codes = Array.from(
            new Set((usersData || []).map((obj: any) => obj.DistrictCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));

        } else if (accessRole?.GpOrPhc === "Yes") {
          let codes = Array.from(
            new Set((usersData || []).map((obj: any) => obj.TalukCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        } else {
          let codes = Array.from(
            new Set((usersData || []).map((obj: any) => obj.GpCode))
          );
          dispatch(otpVerification({ userRole: fetchRole, userCodes: codes }));
        }
        dispatch(
          saveUserRolesAndAccess({
            childRoles: rolesData?.data?.roles,
            accessOfMasters: rolesData?.data?.access,
          })
        );
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
        <i className="my-float">1.0.0</i>
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
