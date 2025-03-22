import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeApi";
import { UserHandle } from "../types";
import HandleData from "../components/HandleData";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;
  const { data, error, isLoading } = useQuery<UserHandle>({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle],
    retry: 1,
  });

  if (isLoading) return "Cargando........";
  if (error) return <Navigate to={"/404"} />;

  if (data) return <HandleData data={data} />;
}
