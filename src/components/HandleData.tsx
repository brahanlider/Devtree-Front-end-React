import { TSocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {
  const links: TSocialNetwork[] = JSON.parse(data.links).filter(
    (link: TSocialNetwork) => link.enabled
  );
  console.log(links);

  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl font-black text-center">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt="img-profile"
          className="max-w-[250px] mx-auto"
        />
      )}

      <p className="text-lg font-bold text-center">{data.description}</p>
      <div className="flex flex-col gap-6 mt-20">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              className="flex items-center gap-5 px-5 py-2 bg-white rounded-lg"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="img-red-social"
                className="w-12"
              />
              <p className="text-lg font-bold text-black capitalize">
                Visita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">No hay enlace en este articulo</p>
        )}
      </div>
    </div>
  );
}
