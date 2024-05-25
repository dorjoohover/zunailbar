import React from "react";
import { Form, Radio, Input, InputNumber, Select, Checkbox } from "antd";

const FormItem = ({ main, added }) => {
  let render;
  // console.log("maxshares", added);
  switch (main?.type) {
    case "radiogroup":
      render = (
        <Checkbox.Group>
          {added?.child.length > 0 &&
            added?.child.map((item, index) => (
              <Checkbox className="" key={index} value={item?.value}>
                {main?.data?.additional_serviceName}
              </Checkbox>
            ))}
        </Checkbox.Group>
      );
      break;
    case "number":
      // form.setFieldsValue({ [main?.name]: added?.value });
      render = (
        // <div className="flex w-[260px] justify-between max-[406px]:w-[220px] min-[680px]:w-[220px] md:w-[240px]">
        //   <div className="">{added?.data?.name}</div>
        <InputNumber
        // min={added?.min}
        // max={added?.max}
        // id="class"
        // style={{ width: "100px" }}
        // size="small"
        // addonBefore={added?.data?.name}
        // label={added?.data?.name}
        // className="justify-between"
        // className="relative bottom-1 left-2 min-[588px]:bottom-8 min-[588px]:left-16"
        // defaultValue={added?.value}
        />
        // </div>
      );
      break;
    case "text":
      render = (
        <>
          <Input className="" placeholder={added?.placeholder} />
        </>
      );
      break;
    case "textarea":
      render = (
        <>
          <Input.TextArea
            placeholder={added.placeholder}
            rows={added?.rows}
            // className="relative  max-[575px]:right-12  max-[575px]:top-[35px]"
          />
        </>
      );
      break;
    case "select":
      render = (
        <Select
          options={added?.child}
          // defaultValue={added?.child[0]}
          placeholder={"main_form_comment_name"}
          // className="relative max-[575px]:right-[115px] max-[575px]:top-8 max-[575px]:ml-2"
        />
      );
      break;
    default:
      render = <div></div>;
  }

  // console.log(main?.data1?.name);
  return (
    <Form.Item
      label={(main?.label && main?.data[main?.label]) || ""}
      name={main?.name}
      // defaultValue={added?.value}
      // rules={[
      //   {
      //     required: main?.required,
      //     message: "main_fill_this_input",
      //   },
      // ]}
      // className=" flex flex-wrap"
    >
      {render}
    </Form.Item>
  );
};

export default FormItem;
