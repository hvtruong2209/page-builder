type CommonButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  className?: string;
  text?: string;
};

export const CommonButton = ({
  children,
  onClick,
  disabled,
  title,
  className = "",
  text,
}: CommonButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} title={title}>
      {text || children}
    </button>
  );
};
