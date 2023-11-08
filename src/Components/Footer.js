import Image from "next/image";
import facebook from "@/Assets/facebook.png";
import telegram from "@/Assets/telegram.png";
function Footer() {
  return (
    <footer className="flex justify-between p-2">
      <div>All Rights Reserved ©WordThread</div>
      <div className="flex gap-4">
        <a
          href="https://www.facebook.com/madareg.barmja"
          className="flex flex-row-reverse items-center gap-2"
        >
          <Image src={facebook} alt="facebook logo" width={24} height={24} />{" "}
          <span className="hidden lg:inline">Facebook</span>
        </a>
        <a
          href="https://t.me/Madareg_barmja"
          className="flex flex-row-reverse items-center gap-2"
        >
          <Image src={telegram} alt="facebook logo" width={24} height={24} />{" "}
          <span className="hidden lg:inline">Telegram</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
