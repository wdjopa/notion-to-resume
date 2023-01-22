/* eslint-disable @next/next/no-img-element */
import NotionToReact, { NotionToText } from "@/components/NotionToReact";
import { SOCIAL_LINKS } from "@/helpers/constants";
import Head from "next/head";
import Image from "next/image";
import { getData } from "./api/hello";

export default function Home({ datas }) {
  console.log(datas);
  const { about, work_experience, education, portfolio } = datas;
  return (
    <>
      <Head>
        <title>{NotionToText(about.name)} - CV Resume</title>

        <meta
          name="description"
          content={`${NotionToText(about.description)}`}
        />
        <meta
          name="keywords"
          content={`resume, ${NotionToText(
            about.name
          )}, onepage, creative, html`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {about.profilePicture && (
          <link href={about.profilePicture} rel="shortcut icon" />
        )}
      </Head>
      <main>
        <div id="preloder" style={{ display: "none" }}>
          <div className="loader" style={{ display: "none" }}></div>
        </div>

        <header className="header-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="site-logo">
                  <h2>
                    <a href="https://resume.io">ResumeMe.IO</a>
                  </h2>
                  <p>Enhance your online presence</p>
                </div>
              </div>
              {about.properties.find((i) =>
                i.name.toLowerCase().includes("resume")
              )?.value && (
                <div className="col-md-8 text-md-right header-buttons">
                  <a
                    href={
                      about.properties.find((i) =>
                        i.name.toLowerCase().includes("resume")
                      )?.value
                    }
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="site-btn"
                  >
                    Download my CV
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="hero-section spad">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 offset-xl-1">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="hero-text">
                      <h2 style={{ fontSize: "6rem" }}>
                        <NotionToReact component={about.name} />
                      </h2>
                      {about.properties.find((i) =>
                        i.name.toLowerCase().includes("job title")
                      )?.value && (
                        <h3 style={{ fontSize: "2rem" }}>
                          <NotionToReact
                            component={
                              about.properties.find((i) =>
                                i.name.toLowerCase().includes("job title")
                              )?.value
                            }
                          />
                        </h3>
                      )}
                      <p
                        style={{
                          fontSize: "1.5rem",
                          marginTop: "2rem",
                          textAlign: "justify",
                        }}
                      >
                        <NotionToReact
                          component={
                            about.properties.find(
                              (i) => i.name.toLowerCase() == "description"
                            )?.value
                          }
                        />
                      </p>
                    </div>
                    <div className="hero-info">
                      {/* <h2>General Info</h2> */}
                      <ul>
                        {about.properties.find((i) =>
                          i.name.toLowerCase().includes("birth")
                        )?.value && (
                          <li>
                            <span>Date of Birth</span>
                            {new Date(
                              about.properties.find((i) =>
                                i.name.toLowerCase().includes("birth")
                              ).value.start
                            ).toDateString()}
                          </li>
                        )}
                        {about.properties.find((i) =>
                          i.name.toLowerCase().includes("address")
                        )?.value && (
                          <li>
                            <span>Address</span>
                            <NotionToReact
                              component={
                                about.properties.find((i) =>
                                  i.name.toLowerCase().includes("address")
                                ).value
                              }
                            />
                          </li>
                        )}
                        {about.properties.find((i) =>
                          i.name.toLowerCase().includes("email")
                        )?.value && (
                          <li>
                            <span>Email</span>
                            <a
                              href={
                                "mailto:" +
                                about.properties.find((i) =>
                                  i.name.toLowerCase().includes("email")
                                ).value
                              }
                            >
                              {
                                about.properties.find((i) =>
                                  i.name.toLowerCase().includes("email")
                                ).value
                              }
                            </a>
                          </li>
                        )}
                        {about.properties.find((i) =>
                          i.name.toLowerCase().includes("phone_number")
                        )?.value && (
                          <li>
                            <span>Phone</span>
                            <a
                              href={
                                "tel:" +
                                about.properties.find((i) =>
                                  i.name.toLowerCase().includes("phone_number")
                                ).value
                              }
                            >
                              {
                                about.properties.find((i) =>
                                  i.name.toLowerCase().includes("phone_number")
                                ).value
                              }
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <figure className="hero-image">
                      <img
                        src={about.profilePicture}
                        style={{ width: "100%" }}
                        alt="5"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="social-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 offset-xl-1">
                <div className="social-link-warp">
                  <div className="social-links">
                    {about.properties
                      .filter(
                        (item) =>
                          SOCIAL_LINKS.includes(item.name.toLowerCase()) &&
                          item.value != null
                      )
                      .map((item) => (
                        <a href={item.value} key={Math.random()}>
                          <i
                            className={
                              "fa-brands fa-solid fa-" + item.name.toLowerCase()
                            }
                          ></i>
                        </a>
                      ))}
                  </div>
                  <h2 className="hidden-md hidden-sm">My Social Profiles</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="resume-section spad">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7 offset-xl-2">
                <div className="section-title">
                  <h2>Work Experience</h2>
                </div>
                <ul className="resume-list">
                  <li>
                    <h2>2016-Present</h2>
                    <h3>Web Design Company</h3>
                    <h4>Web Designer</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed porttitor orci ut sapien scelerisque viverra. Sed
                      trist ique justo nec mauris efficitur, ut lacinia elit
                      dapibus. In egestas elit in dap ibus laoreet. Duis magna
                      libero, fermentum ut facilisis id, pulvinar eget tortor.
                      Vestibulum pelle ntesque tincidunt lorem, vitae euismod
                      felis porttitor sed.{" "}
                    </p>
                  </li>
                  <li>
                    <h2>2014-2016</h2>
                    <h3>Web Design Company</h3>
                    <h4>Web Designer</h4>
                    <p>
                      Sit amet, consectetur adipiscing elit. Sed porttitor orci
                      ut sapien scelerisque viverra. Sed trist ique justo nec
                      mauris efficitur, ut lacinia elit dapibus. In egestas elit
                      in dap ibus laoreet. Duis magna libero, fermentum ut
                      facilisis id, pulvinar eget tortor. Vestibulum pelle
                      ntesque tincidunt lorem, vitae euismod felis porttitor
                      sed.{" "}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="resume-section with-bg spad">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7 offset-xl-2">
                <div className="section-title">
                  <h2>Education</h2>
                </div>
                <ul className="resume-list">
                  <li>
                    <h2>2008</h2>
                    <h3>Ui/Ux Diploma</h3>
                    <h4>Design College California</h4>
                    <p>
                      Sit amet, consectetur adipiscing elit. Sed porttitor orci
                      ut sapien scelerisque viverra. Sed trist ique justo nec
                      mauris efficitur, ut lacinia elit dapibus. In egestas elit
                      in dap ibus laoreet. Duis magna libero, fermentum ut
                      facilisis id, pulvinar eget tortor. Vestibulum pelle
                      ntesque tincidunt lorem, vitae euismod felis porttitor
                      sed.{" "}
                    </p>
                  </li>
                  <li>
                    <h2>2006</h2>
                    <h3>Web design Diploma</h3>
                    <h4>Design College California</h4>
                    <p>
                      Sit amet, consectetur adipiscing elit. Sed porttitor orci
                      ut sapien scelerisque viverra. Sed trist ique justo nec
                      mauris efficitur, ut lacinia elit dapibus. In egestas elit
                      in dap ibus laoreet. Duis magna libero, fermentum ut
                      facilisis id, pulvinar eget tortor. Vestibulum pelle
                      ntesque tincidunt lorem, vitae euismod felis porttitor
                      sed.{" "}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="review-section spad pb-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-7 offset-xl-2">
                <div className="section-title">
                  <h2>References</h2>
                </div>
                <div className="review-slider owl-carousel owl-loaded owl-drag">
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(-3312px, 0px, 0px)",
                        transition: "all 0.25s ease 0s",
                        width: "5796px",
                      }}
                    >
                      <div
                        className="owl-item cloned"
                        style={{ width: "828px" }}
                      >
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "828px" }}
                      >
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "828px" }}>
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                      <div className="owl-item" style={{ width: "828px" }}>
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                      <div
                        className="owl-item active"
                        style={{ width: "828px" }}
                      >
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "828px" }}
                      >
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                      <div
                        className="owl-item cloned"
                        style={{ width: "828px" }}
                      >
                        <div className="single-review">
                          <div className="qut">“</div>
                          <p>
                            Sit amet, consectetur adipiscing elit. Sed porttitor
                            orci ut sapien scelerisque viverra. Sed trist ique
                            justo nec mauris efficitur, ut lacinia elit dapibus.
                            In egestas elit in dap ibus laoreet. Duis magna
                            libero, fermentum ut facilisis id, pulvinar eget
                            tortor. Vestibulum pelle ntesque tincidunt lorem,
                            vitae euismod felis porttitor sed.{" "}
                          </p>
                          <h3>Robert G. Smith</h3>
                          <h4>Manager, Company</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-nav disabled">
                    <div className="owl-prev">prev</div>
                    <div className="owl-next">next</div>
                  </div>
                  <div className="owl-dots">
                    <div className="owl-dot">
                      <span></span>
                    </div>
                    <div className="owl-dot">
                      <span></span>
                    </div>
                    <div className="owl-dot active">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section spad pb-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-4 col-md-8 offset-xl-2 ">
                <div className="section-title">
                  <h2>Portfolio</h2>
                </div>
              </div>
              <div className="col-md-4 text-md-right">
                <a href="" className="site-btn mb-5">
                  See All Portfolio
                </a>
              </div>
            </div>
            <div className="portfolio-warp">
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="portfolio-item">
                    <a
                      href="/img/portfolio/1.jpg"
                      className="set-bg port-pic"
                      data-setbg="img/portfolio/1.jpg"
                      style={{ backgroundImage: `url("/img/portfolio/1.jpg")` }}
                    ></a>
                    <h2>Brand Campaign</h2>
                    <p>Graphic design</p>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="portfolio-item">
                    <a
                      href="/img/portfolio/2.jpg"
                      className="set-bg port-pic"
                      data-setbg="img/portfolio/2.jpg"
                      style={{ backgroundImage: `url("/img/portfolio/2.jpg")` }}
                    ></a>
                    <h2>A Corporate Identity</h2>
                    <p>Graphic design</p>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="portfolio-item">
                    <a
                      href="/img/portfolio/3.jpg"
                      className="set-bg port-pic"
                      data-setbg="img/portfolio/3.jpg"
                      style={{ backgroundImage: `url("/img/portfolio/3.jpg")` }}
                    ></a>
                    <h2>Web Design Website</h2>
                    <p>Graphic design</p>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="portfolio-item">
                    <a
                      href="/img/portfolio/4.jpg"
                      className="set-bg port-pic"
                      data-setbg="img/portfolio/4.jpg"
                      style={{ backgroundImage: `url("/img/portfolio/4.jpg")` }}
                    ></a>
                    <h2>Logo design</h2>
                    <p>Graphic design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="extra-section spad pb-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                <div className="section-title">
                  <h2>Extra Skills</h2>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-6 pt-5">
                    <div className="fact-box trans">
                      <div className="fact-content">
                        <div className="circle-progress">
                          <div id="progress1" className="prog-circle">
                            <canvas
                              width="350"
                              height="350"
                              style={{ height: "175px", width: "175px" }}
                            ></canvas>
                          </div>
                          <div className="progress-info">
                            <h2>75%</h2>
                          </div>
                          <div className="prog-title">
                            <h3>Inspiration</h3>
                            <p>Etiam nec odio vestibulum est.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 pt-5">
                    <div className="fact-box trans">
                      <div className="fact-content">
                        <div className="circle-progress">
                          <div id="progress2" className="prog-circle">
                            <canvas
                              width="350"
                              height="350"
                              style={{ height: "175px", width: "175px" }}
                            ></canvas>
                          </div>
                          <div className="progress-info">
                            <h2>83%</h2>
                          </div>
                          <div className="prog-title">
                            <h3>Inspiration</h3>
                            <p>Etiam nec odio vestibulum est.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="fact-box">
                      <div className="fact-content">
                        <Image src="/img/1-w.png" alt="" fill />
                        <h2>14</h2>
                        <p>Years of Experience</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="fact-box">
                      <div className="fact-content">
                        <Image src="/img/2-w.png" alt="" fill />
                        <h2>9</h2>
                        <p>Awards Won</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section spad">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                <div className="section-title">
                  <h2>Contact Me</h2>
                </div>
                <form className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" placeholder="E-mail" />
                    </div>
                    <div className="col-md-12">
                      <input type="text" placeholder="Subject" />
                      <textarea placeholder="Message"></textarea>
                    </div>
                  </div>
                  <div className="text-md-right">
                    <button className="site-btn">Send message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div className="container text-center">
            <div className="copyright">
              Copyright ©
              <script>document.write(new Date().getFullYear()),</script>2023 All
              rights reserved | This template is made with{" "}
              <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
              <a href="https://colorlib.com/" rel="noreferrer" target="_blank">
                Colorlib
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const websiteUrl = `${protocol}://${host}`;
  try {
    const datas = await getData(websiteUrl);
    console.log({ datas });
    return {
      props: {
        datas,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
