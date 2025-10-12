interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className = "", width = 120, height = 40 }: LogoProps) => {
  return (
    <img
      src="/logosapsap.png"
      alt="Sap Sap Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
};

export default Logo;