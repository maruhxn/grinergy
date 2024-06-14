import ContactParagraph from "@/components/ContactParagraph";
import InfoRow from "@/components/InfoRow";
import { getIsEng } from "@/libs/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const isEng = await getIsEng();
  return (
    <div className="mb-[2vh] w-full mt-[16.55vh] lg:mb-[4.1666vh]">
      <div className="mx-auto lg:ml-[31vw] lg:mr-0 w-fit">
        <ContactParagraph />
        <section className="flex flex-col justify-between ml-[16vw] lg:ml-0 w-fit lg:w-auto space-y-[10vh]">
          {[0, 1, 2, 3].map((idx) => (
            <InfoRow isEng={isEng} key={idx} idx={idx} />
          ))}
        </section>
      </div>
    </div>
  );
}
