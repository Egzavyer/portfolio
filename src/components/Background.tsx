type BackgroundProps = {
  children: React.ReactNode;
};

export function Background({ children }: BackgroundProps) {
  return <div className="size-full bg-primary">{children}</div>;
}
