import React from "react";
import FormItem from "./FormItem";
import { Checkbox, Form, Input } from "antd";

const Additional_service = ({
  data,
  events,
  tr,
  form,
  additional_services_list,
}) => {
  const discussions = additional_services_list || [];

  //   const value = data?.auth?.detail?.shareholder?.amount;
  const value = 1;

  // console.log;

  const questions = [
    // {
    //   name: "main_approved",
    //   value: "accept",
    // },
    {
      name: "main_checked",
      value: "checked",
    },
    // {
    //   name: "main_suspended",
    //   value: "suspended",
    // },
  ];

  const handleDiscussionSelection = (discussionId, value) => {
    form.setFieldsValue({ [`additional_service-${discussionId}`]: value });
  };

  //   const areAllDiscussionsSelected = () => {
  //     const discussionsFormValues = form.getFieldsValue();
  //     const selectedDiscussions = Object.values(discussionsFormValues).filter(
  //       (value, key) => key.startsWith("disc-") && value !== undefined
  //     );
  //     return selectedDiscussions.length === discussions.length;
  //   };
  //   const isDeclined = (itemId) => {
  //     // console.log("itemId", itemId);
  //     const values = form.getFieldValue(`additional_service_${itemId}`);
  //     console.log("Array.isArray(values)", itemId, values.includes("declined"));
  //     if (Array.isArray(values) && values.includes("declined")) {
  //       return true;
  //     }
  //   };

  return (
    <Form.Item className="my-4" name={'additional_services'}>
      <Checkbox.Group
        options={discussions.map((d) => {
          return {
            value: d.id,
            label: `${d.additional_serviceName} (${d.default_price}₮)`,
          };
        })}
      />
    </Form.Item>
  );
  // return discussions.map((item, index) => {
  //   // console.log(getFieldValue("additional_services"));
  //   return (
  //     <div key={index} className="my-4">
  //       <Form.Item  name={`additional_services`}>
  //         <Checkbox.Group >
  //           <Checkbox className="" key={index} value={item?.id}>
  //             {item?.additional_serviceName} ({item?.default_price}₮)
  //           </Checkbox>
  //         </Checkbox.Group>
  //       </Form.Item>
  //       <Form.Item name={'additional_services'}>
  //     <Checkbox.Group options={}/>
  //       </Form.Item>
  //       <Form.Item noStyle shouldUpdate>
  //         {({ getFieldValue }) =>
  //           Array.isArray(getFieldValue(`additional_service_${item.id}`)) &&
  //           getFieldValue(`additional_service_${item.id}`).includes(
  //             "checked"
  //           ) === true ? (
  //             <div>
  //               <div className="text-gray-500">Үнийн дүн</div>
  //               <FormItem
  //                 // tr={tr}
  //                 // form={form}
  //                 // onChange={(value) => handleDiscussionSelection(item.id, value)}
  //                 main={{
  //                   data: item,
  //                   type: "number",
  //                   name: `additional_service-${item.id}`,
  //                   label: "main_vote_declined_comment",
  //                   required: true,
  //                 }}
  //                 added={{
  //                   value: item?.default_price,
  //                   child: questions,
  //                 }}
  //               >
  //                 {/* <Input /> */}
  //               </FormItem>
  //             </div>
  //           ) : null
  //         }
  //       </Form.Item>
  //     </div>
  //   );
  // });
};

export default Additional_service;
