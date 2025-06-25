import './ReadOnlyBox.css'

const ReadOnlyBox = ({
  value,
  title,
  onClick,
}: {
  value: string | number;
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="readonly-box"
      title={title}
      onClick={onClick}
      role="presentation"
    >
      {value}
    </div>
  );
};

export default ReadOnlyBox