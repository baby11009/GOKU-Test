type ElProps = React.HTMLAttributes<HTMLElement>;

const PrimaryButton = ({
  text,
  className = "",
  ...props
}: { text: string } & ElProps) => {
  return (
    <button
      className={`mt-5 md:mt-10 relative px-16 md:px-20 py-3 md:py-5 bg-primary rounded-2xl
        border-secondary border-3 hover:bg-white/85 hover:border-white drop-shadow-lg drop-shadow-white/0 hover:drop-shadow-white
        transition-all duration-300 group ${className}`}
      {...props}
    >
      <p className='uppercase group-hover:text-primary font-medium text-sm md:text-base'>
        {text}
      </p>
    </button>
  );
};
export default PrimaryButton;
