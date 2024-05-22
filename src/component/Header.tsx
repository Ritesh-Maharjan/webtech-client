import logo from "../assets/Logo-Transparent-01.png";

export default function Header() {
  return (
    <div className="flex justify-between w-full absolute top-0 p-6">
      <a href="#">
        <img src={logo} alt="Logo WebTeck" className="h-[80px] w-[80px]" />
      </a>
      <h2>Sun</h2>
    </div>
  );
}