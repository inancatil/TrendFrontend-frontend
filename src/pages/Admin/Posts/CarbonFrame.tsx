interface Props {
  gistId: string;
}

export default function CarbonFrame({ gistId }: Props) {
  return (
    <iframe
      title="style codef"
      src={`https://carbon.now.sh/embed/${gistId}`}
      style={{
        width: 680,
        height: 528,
        border: 0,
        transform: "scale(1)",
        overflow: "hidden",
      }}
      sandbox={"allow-scripts allow-same-origin"}
    ></iframe>
  );
}
