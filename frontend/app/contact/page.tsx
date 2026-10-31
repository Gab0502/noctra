import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReservationCard from "@/components/contact/ReservationCard";
import { bindingFor } from "@/lib/volumes";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Commission a project",
  description: "Write to NOCTRA about a house, an interior or a public building. Studios in Berlin and Oslo.",
};

export default function ContactPage() {
  const binding = bindingFor("contact", { name: "chevron", accent: "#e9c349" });
  return (
    <>
      <Navbar />
      <main id="main" className={`binding ${styles.contact}`} style={binding.style}>
        <div className={styles.layout}>
          <header className={styles.head}>
            <h1 className={styles.title}>Commission a project</h1>
            <p className={styles.lead}>
              Tell us where the site is and what you would like to build. One of the studios answers within a
              week.
            </p>
            <dl className={styles.studios}>
              <div>
                <dt>Berlin</dt>
                <dd>Schlüterstraße 45, 10629 Berlin</dd>
              </div>
              <div>
                <dt>Oslo</dt>
                <dd>Aker Brygge 4, B125, 0150 Oslo</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Monday to Friday, 9 to 18</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:contact@noctra.arch" className="link-quiet">contact@noctra.arch</a></dd>
              </div>
            </dl>
            <figure className={styles.photo}>
              <div className={styles.photoFrame}>
                <Image
                  src="/archive/oslo-opera-house-late-night-walk-on.jpg"
                  alt="People walking on the roof of the Oslo Opera House late at night, the fjord lit beyond"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="caption">
                Our neighbour on the Oslo waterfront, late at night. Photograph by Trine Syvertsen, CC BY 2.0.
              </figcaption>
            </figure>
          </header>
          <ReservationCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
