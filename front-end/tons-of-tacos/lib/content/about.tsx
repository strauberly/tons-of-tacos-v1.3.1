import React from "react";

const gitHubLink: string = `https://github.com/strauberly`;
const frontEndRepo: string = `https://github.com/strauberly/tons-of-tacos-v1.3.1`;
const backendEndRepo: string = `https://github.com/strauberly/tons-of-tacos-v1.2.1`;

export const title: string = "About:";

export const projectAbout: React.ReactNode = (
  <span>
    *This site is a portfolio project for Adam Straub. It is a demonstration for
    recruiters and future employers of being able to use an unfamiliar tool to
    produce desired results without a formal education. In this case, Next.js
    was new to me. <br /> <br />
    Please feel free to check out the project on{" "}
    <a href={gitHubLink} target="_blank">
      Git Hub
    </a>
    . This project utilizes my repositories,{" "}
    <a href={frontEndRepo} target="_blank">
      tons of tacos v1.3.1
    </a>
    &nbsp; for the frontend and &nbsp;
    <a href={backendEndRepo} target="_blank">
      tons of tacos 1.2.1
    </a>{" "}
    for the backend.
    <br /> <br />
    Tons of Tacos is a fictional food truck company(Brian and Jess Castillo are
    also fictional ^_^) that requested a web application to increase the amount
    of sales they could process in a set time frame.
    <br /> <br />
    Traditionally, a busy food truck can be bogged down with customers milling
    about in front of the truck. Time is lost while deciding what customers want
    to order and then going through the ordering process.
    <br /> <br />
    With this application, the menu can be viewed and orders placed remotely.
    This speeds up the ordering process and allows more orders to be filled in
    the same time frame.
    <br /> <br />
    I would love anyone&apos;s feedback on ways to improve this project in order
    to obtain my employment goals.
    <br /> <br />
    Cheers!
    <br /> <br />
    - Adam
    <br /> <br />
    zeron30@hotmail.com
  </span>
);

export const aboutStory: string = `
We got our start in the world flipping homes for profit. Over time, we realized a negative impact this was having on affordable housing in our community and decided to switch gears. 

We sold off our portfolio to first time buyers for cost except for one. We converted that property into a small scale farm we use to create the ingredients for our food we love to share with others.

Our passion for delicious, wholesome, satisfying meals is matched by watching folks come together at a table to enjoy those meals and we love catering for group functions and being a part of folks special events.

Thank you for selecting us to provide you with delicious fuel to get you through a busy day. Please let us know if there is anything we can do to enhance your experience.

Love,

Brian and Jess Castillo

Tons of Tacos
1.555.555.5555
tonsoftacos@tonsoftacos.com
`;
