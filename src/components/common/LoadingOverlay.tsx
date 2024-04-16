import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { ILoaderOverlay } from "../../utilities/interfacesOrtype";
import styled, { css } from "styled-components";

export default function LoaderOverlay({isLoading}:ILoaderOverlay ) {
  const DarkBackground = styled.div`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  
    ${isLoading &&
      css`
        display: block; /* show */
      `}
  `;
  return (
    <DarkBackground>
      <LoadingOverlay active={true} spinner text="Loading your content...">
        <div className="h-screen">
        </div>
      </LoadingOverlay>
    </DarkBackground>
  );
}
