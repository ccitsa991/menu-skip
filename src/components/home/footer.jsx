import { useState } from "react";
import { PiInfoLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import SharedModal from "../shared/modal";

const Footer = () => {
  const { t } = useTranslation(); // Use translation hook
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Fixed Footer */}
      <div className="fixed bottom-0 w-full max-w-[500px] mx-auto  text-text-color bg-white shadow-lg py-3 px-6 flex items-center justify-between">
        {/* Left Section - Daily Calories */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <PiInfoLight className="text-lg" />
          <p className="underline text-sm">{t("footer.dailyCalories")}</p>
        </div>

        {/* Right Section - Powered By */}
        <div className="flex items-center">
          <p className="text-sm">{t("footer.poweredBy")}</p>
          <a target="_blank" href="https://skipit.app/"><img src="/images/skip-logo.svg" alt="skip" className="ps-1" /></a>
        </div>
      </div>

      {/* Modal Component */}
      <SharedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("footer.modal.title")}
      >
        {/* Modal Content */}
        <p className="text-[#8890A0] text-center  pt-4 px-4">
          {t("footer.modal.content")}
        </p>
      </SharedModal>
    </>
  );
};

export default Footer;
