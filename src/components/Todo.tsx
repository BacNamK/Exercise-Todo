import { useEffect, useMemo, useState } from "react";
import search from "../img/search.png";
import detailimg from "../img/search-file.png";
import tick from "../img/check-mark.png";
import dele from "../img/x.png";
import Create from "./Create";

type props = {
  light: boolean;
};

type todo = {
  id: number;
  name: string;
  note: string;
  state: any;
};

const Todo = ({ light }: props) => {
  const [todo, setTodo] = useState<todo[]>([]);

  const [allTodo, setAllTodo] = useState<todo[]>([]);

  const [page, setPage] = useState(1);

  const LiMIT = 5;

  const [opens, setOpen] = useState(false);

  const [sign, setSign] = useState(false);

  const [value, setValue] = useState("");

  const [detail, setDetail] = useState("");

  const getLocal = () => {
    const todoString = localStorage.getItem("task");
    const todo = todoString ? JSON.parse(todoString) : [];
    setTodo([...todo].reverse());
    setAllTodo(todo);
  };

  useEffect(() => {
    getLocal();
  }, [sign]);

  const searchTask = () => {
    const v = value.toLowerCase();
    const clone = allTodo;
    const fil = clone.filter((t) => t.name.toLowerCase().includes(v));
    setTodo(fil);
  };

  useEffect(() => {
    if (!value) getLocal();
    searchTask();
  }, [value]);

  const pageTodo = useMemo(() => {
    const start = (page - 1) * LiMIT;
    const end = page * LiMIT;
    return todo.slice(start, end);
  }, [todo, page]);

  const totalPage = Math.ceil(todo.length / LiMIT);

  const filterFinish = () => {
    setTodo([]);
    const task = localStorage.getItem("task");
    if (task) {
      const TaskOject = JSON.parse(task);
      const newlist = TaskOject.filter(
        (element: any) => element.state === true
      );
      setTodo([...newlist].reverse());
    }
  };

  const unfinishedTask = () => {
    setTodo([]);
    const task = localStorage.getItem("task");
    if (task) {
      const TaskOject = JSON.parse(task);
      const newlist = TaskOject.filter(
        (element: any) => element.state === false
      );
      setTodo([...newlist].reverse());
    }
  };

  const tickDoneTask = (id: any) => {
    const taskStr = localStorage.getItem("task");
    const task = taskStr ? JSON.parse(taskStr) : [];
    const updateTick = task.map((t: any) =>
      t.id === id ? { ...t, state: true } : t
    );
    localStorage.setItem("task", JSON.stringify(updateTick));
    setSign(!sign);
  };

  const DeleteTask = (id: number) => {
    const TaskString = localStorage.getItem("task");
    if (TaskString) {
      const TaskOject = JSON.parse(TaskString);
      const newList = TaskOject.filter((elelment: any) => elelment.id !== id);
      localStorage.setItem("task", JSON.stringify(newList));
      setSign(!sign);
    }
  };

  const opensDetail = (todo: any) => {
    setDetail((prev) => (prev === todo.id ? null : todo.id));
  };

  return (
    <div
      className={`w-full h-full absolute z-20 top-0 justify-items-center content-center max-md:h-190 ${
        light ? "text-black" : "text-white"
      } `}
    >
      <div
        className={` duration-300  rounded-xl max-lg:w-[90%]  ${
          opens ? " h-0 w-0" : "w-[50%] h-[90%]"
        }`}
      >
        <h1
          className={`w-full text-center h-10 content-center text-4xl font-bold pt-5 ${
            opens ? "hidden" : ""
          }`}
        >
          TODO
        </h1>
        <div
          className={`w-full flex justify-center gap-15 mt-15 max-md:w-full ${
            opens ? "hidden" : ""
          }`}
        >
          <div className="w-[50%] bg-white shadow h-10 rounded-xl  pl-2 flex relative">
            <form onSubmit={searchTask} className="content-center w-[90%]">
              <input
                onChange={(e) => setValue(e.target.value)}
                className="w-full outline-none h-full text-black"
                type="text"
                placeholder="Tìm Tên Nhiệm Vụ"
              />
            </form>
            <img
              src={search}
              className="w-10 scale-70 absolute right-0   "
              alt=""
            />
          </div>
          <div
            onClick={() => setOpen(!opens)}
            className="bg-green-400 w-[20%] text-center content-center rounded-xl shadow cursor-pointer"
          >
            Tạo
          </div>
        </div>
        <div
          className={`w-full justify-items-center mt-5 ${
            opens ? "hidden" : ""
          }`}
        >
          <ul className="flex w-[98%] justify-around items-center gap-5">
            <li
              onClick={() => setSign(!sign)}
              className={`flex-1/3 h-10 content-center text-center rounded-[5px] cursor-pointer hover:bg-gray-300 duration-500 ${
                light ? "" : "shadow bg-white/10"
              }`}
            >
              Tất Cả
            </li>
            <li
              onClick={filterFinish}
              className={`flex-1/3 h-10 content-center text-center rounded-[5px] cursor-pointer hover:bg-gray-300 duration-500 ${
                light ? "" : "shadow bg-white/10"
              } `}
            >
              Hoàn Thành
            </li>
            <li
              onClick={unfinishedTask}
              className={`flex-1/3 h-10 content-center text-center rounded-[5px] cursor-pointer hover:bg-gray-300 duration-500 ${
                light ? "" : "shadow bg-white/10"
              }`}
            >
              Đang Thực Hiện
            </li>
          </ul>
        </div>
        <div
          className={`w-full h-[50%] mt-5 relative ${opens ? "hidden" : ""}`}
        >
          {todo.length > 0 ? (
            pageTodo.map((todo: any) => (
              <div key={todo.id}>
                <div
                  className={`flex rounded-[5px] shadow duration-200  ${
                    detail === todo.id
                      ? "absolute top-0 z-50 w-full bg-white"
                      : "mt-2"
                  } ${
                    light
                      ? "outline-1 outline-black/20"
                      : " text-black bg-white"
                  }`}
                >
                  <div className="flex w-[60%] gap-5 p-4">
                    <div className="flex-1/2">{todo.name}</div>
                    <div className="">{todo.date}</div>
                  </div>
                  <div className="w-[40%] justify-items-end content-center pr-3">
                    <ul className="flex w-full">
                      <li
                        onClick={() => opensDetail(todo)}
                        className="hover:bg-gray-300 p-1 rounded-full flex-1/3 justify-items-center"
                      >
                        <img
                          src={detailimg}
                          className="w-5 content-center "
                          alt=""
                        />
                      </li>
                      <li
                        onClick={() => tickDoneTask(todo.id)}
                        className="hover:bg-green-400 p-1 rounded-full flex-1/3 justify-items-center"
                      >
                        {todo.state === true ? (
                          "Hoàn Thành"
                        ) : (
                          <img src={tick} className="w-5" alt="" />
                        )}
                      </li>
                      <li
                        onClick={() => DeleteTask(todo.id)}
                        className="hover:bg-red-400 p-1 rounded-full flex-1/3 justify-items-center content-center"
                      >
                        <img src={dele} className="w-5 scale-80" alt="" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={`${
                    detail === todo.id
                      ? "absolute top-15 w-full h-30 z-20 bg-gray-100 duration-300 rounded-b-[5px] p-5"
                      : " h-0 w-0 top-auto  "
                  }`}
                >
                  <p className={`${detail === todo.id ? "" : "hidden"}`}>
                    {todo.note}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-50 content-center justify-items-center">
              <p>Không Có Nhiệm Vụ Nào</p>
            </div>
          )}
        </div>
        <div className="flex justify-end w-full max-sm:absolute max-sm:bottom-10 max-sm:right-5  ">
          <div className={`w-auto ${opens ? "hidden" : ""}`}>
            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                className={`shadow w-6 rounded-[3px] mr-2  ${
                  page === i + 1 ? " outline-1" : ""
                } ${light ? "" : "outline-gray-50"}`}
                key={i}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Create opens={opens} setOpen={setOpen} sign={sign} setSign={setSign} />
    </div>
  );
};
export default Todo;
