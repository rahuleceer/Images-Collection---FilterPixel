import React, { useState } from "react";
import axios from "axios";
import { Card, Image } from "@mantine/core";

export default function S3() {
  const [list, setList] = useState([]);
  console.log("Test");
  const v = async () => {
    axios
      .post("http://localhost:3003/api/v1/s3")
      .then((response) => {
        console.log("---->", response);
        setList(response.data.val);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  if(list.length == 0) {
    v();
  }
  console.log("list------------------>", list);

  return (
    <div style={{ display: "flex", flexWrap: "wrap"}}>
      {
        //map on list
        list?.map((el) => {
          return (
            <div style={{ width: "300px", height: "300px" }}>
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{ margin: "3%" }}
                >
                  <Card.Section>
                    <Image
                      src={`https://testbucketfp.s3.ap-south-1.amazonaws.com/${el}`}
                      height={300}
                      alt="Norway"
                    />
                  </Card.Section>
                </Card>
              </div>
          );
        })
      }
    </div>
  );
}
