import { useState } from "react";
import { toast } from "sonner";

import add from "../img/add.png";

type props = {
  opens: boolean;
  sign: boolean;
  setSign: (Value: boolean) => void;
  setOpen: (value: boolean) => void;
};

function getInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Create = ({ opens, setOpen, sign, setSign }: props) => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [state] = useState(false);

  const CreateTask = () => {
    if (!name) {
      toast.error("Điền tên nhiệm vụ!");
      return;
    }
    try {
      const task = {
        id: getInt(1, 1000),
        name: name,
        note: note,
        date: date,
        state: state,
      };
      const taskString = localStorage.getItem("task");
      if (taskString) {
        const check = JSON.parse(taskString);
        check.push(task);
        localStorage.setItem("task", JSON.stringify(check));
      } else {
        localStorage.setItem("task", JSON.stringify([task]));
      }
    } catch (error) {
      toast.error("Lỗi khi thực hiện lưu!");
    }
    setName("");
    setNote("");
    setDate("");
    setSign(!sign);
    setOpen(!opens);
    toast.success("Tạo Nhiệm vụ mới thành công!");
  };

  return (
    <div
      className={`${
        opens
          ? "xl:w-[55%] xl:h-[60%] md:w-[80%]  max-lg:h-[63%] lg:h-[70%]"
          : "w-0 h-0"
      } absolute z-50 top-20  bg-white/30 rounded-xl duration-300 shadow-2xl max-md:w-[90%]`}
    >
      <button
        className={`absolute right-4 top-2 shadow rounded-xl w-10 cursor-pointer ${
          opens ? "" : "hidden"
        }`}
        onClick={() => setOpen(!opens)}
      >
        X
      </button>
      <div className="w-full grid mt-15 justify-items-center text-black">
        <input
          className={`w-[90%] h-10 bg-gray-100  pl-2 rounded-xl outline-none  ${
            opens ? "w-[90%]" : "hidden"
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Tên Nhiệm Vụ"
        />
        <textarea
          value={note}
          maxLength={500}
          rows={7}
          cols={20}
          onChange={(e) => setNote(e.target.value)}
          className={` bg-gray-100  mt-10 p-2 rounded-xl outline-none ${
            opens ? "w-[90%]" : "hidden"
          }`}
          name=""
          id=""
          placeholder="Ghi chú nhiệm vụ"
        />
        <div
          className={`md:flex w-[90%] mt-5 items-center h-20 justify-between `}
        >
          <div
            className={`flex  w-full h-12 bg-white/50 shadow rounded-[5px] pl-3 pr-5 ${
              opens ? "" : "hidden"
            }`}
          >
            <label
              className={`w-1/2 content-center pr-1 ${opens ? "" : "hidden"}`}
            >
              Mục Tiêu :
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className={`rounded-xl outline-none ${opens ? "" : "hidden"}`}
            />
          </div>
          <div className="w-full content-center flex justify-center max-md:mt-5">
            <button
              onClick={() => CreateTask()}
              className={`items-center bg-green-500 p-1 h-12 w-30 justify-items-center shadow rounded-[5px] ${
                opens ? "" : "hidden"
              }`}
            >
              <img src={add} className="" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create;
