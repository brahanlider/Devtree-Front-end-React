import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { updateUser } from "../api/DevTreeApi";
import { TSocialNetwork, TUser } from "../types";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: TUser = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente");
    },
  });

  useEffect(() => {
    const updateData = devTreeLinks.map((item) => {
      const userlink = JSON.parse(user.links).find(
        (link: TSocialNetwork) => link.name === item.name
      );
      if (userlink) {
        return { ...item, url: userlink.url, enabled: userlink.enabled };
      }
      return item;
    });
    setDevTreeLinks(updateData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(updateLinks);

    queryClient.setQueryData(["user"], (prevData: TUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updateLinks),
      };
    });
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updateEnableLink = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no válida");
        }
      }
      return link;
    });
    setDevTreeLinks(updateEnableLink);

    queryClient.setQueryData(["user"], (prevData: TUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updateEnableLink),
      };
    });
  };

  // console.log(devTreeLinks);
  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="w-full p-2 text-lg font-bold uppercase rounded-md bg-cyan-100 text-slate-600"
        onClick={() => mutate(user)}
      >
        Guardar Cambios
      </button>
    </div>
  );
}
