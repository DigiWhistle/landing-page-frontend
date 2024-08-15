import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import FormTextInput from "@/components/ui/form/form-text-input";
import { toast } from "sonner";
import { PaperAirplaneIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Pointer } from "lucide-react";
import { FormDescription } from "@/components/ui/form";
const timeSince = (date: any) => {
  const now: any = new Date();
  const updatedAt: any = new Date(date);
  // Calculate the time difference in milliseconds
  const differenceInTime = now - updatedAt;

  // Calculate the difference in days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  // Return the formatted string
  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else {
    return `${differenceInDays} days ago`;
  }
};
const UpdateRemarksFormSchema = z.object({
  editremarks: z.string().max(400, "characters should be less than 400"),
});

const EditableRemark = ({
  item,
  name,
  SetEditorMode,
  mainEditor,
  SetFetcher,
  fetchOrNot,
}: {
  item: any;
  name: string;
  SetEditorMode: any;
  mainEditor: boolean;
  SetFetcher: any;
  fetchOrNot: number;
}) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [activeEdit, setActive] = useState(false);
  useEffect(() => {
    setTimeAgo(timeSince(item.updatedAt));
  }, [item.updatedAt]);
  const individualform = useForm<z.infer<typeof UpdateRemarksFormSchema>>({
    resolver: zodResolver(UpdateRemarksFormSchema),
  });

  const handleindividualForm = async (data: z.infer<typeof UpdateRemarksFormSchema>) => {
    toast.success("updated successfully");
    individualform.reset();
    setActive(false);
    SetEditorMode(true);
    SetFetcher(fetchOrNot + 1);
  };
  const handleEdit = () => {
    setActive(true);
    SetEditorMode(false);
  };
  const handleCloseEdit = () => {
    setActive(false);
    SetEditorMode(true);
  };
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-end">
        <div className="flex w-full gap-3 items-center">
          <Avatar className="w-10 h-10 bg-slate-100 rounded-full ">
            {item.profilePic ? (
              <AvatarImage src="https://github.com/shadcn.png" />
            ) : (
              <div className="flex w-full h-full items-center justify-center">BV</div>
            )}
          </Avatar>
          <div className="flex flex-col">
            <div className="text-body-md-medium">{item.name}</div>
            <div className="text-body-sm-light text-tc-body-grey"> {timeAgo}</div>
          </div>
        </div>
        {(mainEditor || activeEdit) && item.name.includes(name) ? (
          !activeEdit ? (
            <PencilSquareIcon
              onClick={handleEdit}
              cursor={"pointer"}
              className="text-tc-ic-black-default w-5 h-5"
            />
          ) : (
            <XCircleIcon
              onClick={handleCloseEdit}
              cursor={"pointer"}
              className="text-tc-ic-black-default w-6 h-6"
            />
          )
        ) : (
          <></>
        )}
      </div>
      <div className="w-full"></div>
      <Form {...individualform}>
        <form
          action=""
          className="flex flex-col gap-2 items-center w-full"
          onSubmit={individualform.handleSubmit(handleindividualForm)}
        >
          <FormTextInput
            className={""}
            inputCN={item.name.includes(name) ? "" : "bg-[#F0F0F1] "}
            formName="editremarks"
            disabled={!activeEdit}
            label=""
            // placeholder="Add new remark here..."
            placeholder={item.message}
            rightIcon={
              activeEdit ? (
                <PaperAirplaneIcon className="text-tc-ic-black-default w-4 h-4" />
              ) : (
                <></>
              )
            }
          />
          {activeEdit ? (
            <FormDescription className="flex w-full pl-2">
              {individualform.watch("editremarks")
                ? 400 - individualform.watch("editremarks").length
                : "400"}
              /400 characters remaining
            </FormDescription>
          ) : (
            <></>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EditableRemark;