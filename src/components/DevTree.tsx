import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import NavigationTabs from "../components/NavigationTabs";
import { TSocialNetwork, TUser } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";

type DevTreeProps = {
  data: TUser;
};

export default function DevTree({ data }: DevTreeProps) {
  const [enabledLinks, setEnabledLinks] = useState<TSocialNetwork[]>(
    JSON.parse(data.links).filter((item: TSocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: TSocialNetwork) => item.enabled)
    );
  }, [data]);

  const queryClient = useQueryClient();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);
      setEnabledLinks(order);

      const disabledLinks: TSocialNetwork[] = JSON.parse(data.links).filter(
        (item: TSocialNetwork) => !item.enabled
      );

      const links = order.concat(disabledLinks);
      queryClient.setQueryData(["user"], (prevData: TUser) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <>
      <header className="py-5 bg-slate-800">
        <div className="flex flex-col items-center max-w-5xl mx-auto md:flex-row md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="block w-full" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className="p-2 text-xs font-black uppercase rounded-lg cursor-pointer bg-lime-500 text-slate-800"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen py-10 bg-gray-100 md:px-5">
        <main className="max-w-5xl p-10 mx-auto md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="text-2xl font-bold text-right text-slate-800"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil:/{data.handle}
            </Link>
          </div>

          <div className="flex flex-col gap-10 mt-10 md:flex-row">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full px-5 py-10 space-y-6 md:w-96 bg-slate-800">
              <p className="text-4xl text-center text-white">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt={`Imagen Perfil:  ${data.name}`}
                  className="mx-auto max-w-[250px]"
                />
              )}
              <p className="text-lg font-black text-center text-white">
                {data.description}
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="flex flex-col gap-5 mt-20">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
