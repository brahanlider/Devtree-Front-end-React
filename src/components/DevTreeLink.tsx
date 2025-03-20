import { TSocialNetwork } from "../types";

type DevTreeLinkProps = {
  link: TSocialNetwork;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  return (
    <li className="flex items-center gap-5 p-2 px-5 bg-white rounded-lg">
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
      ></div>
      <p className="font-normal text-black capitalize">
        Visita mi: <span className="font-black">{link.name}</span>
      </p>
    </li>
  );
}
