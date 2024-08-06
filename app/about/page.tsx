import Desc from "@/components/Desc";
import Stories from "@/components/Stories";
import React, { FC } from "react";

const About: FC = () => {
  return (
    <div>
      <Desc
        img="/images/GYMAWY.png"
        body="A publishing company that focuses on the essentials."
      />
      <Stories />
    </div>
  );
};

export default About;
