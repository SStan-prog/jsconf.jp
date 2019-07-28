import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import { Layout } from "../components/Layout"
import { SEO } from "../components/Seo"
import { Hero } from "../components/Hero"
import { Map } from "../components/Map"
import { Address } from "../components/Address"
import { SubTitle } from "../components/SubTitle"
import { SpeakerList } from "../components/SpeakerList"
import { SponsorList } from "../components/SponsorList"
import { LinkButton } from "../components/LinkButton"
import { Card as _Card } from "../components/Card"
import { Centerize } from "../components/Centerize"
import bg from "../images/bg.png"
import bgFlipX from "../images/bg-flip-x.png"

const WavyBox = styled.div`
  background-image: url("${bg}"), url("${bgFlipX}");
  background-repeat: no-repeat, no-repeat;
  background-position: top -830px right -300px, center left -450px;
  background-size: 100%, 120%;
`
const Card = styled(_Card)`
  max-width: 1080px;
  margin: 80px auto;
  padding: 70px;

  ${({ theme }) => theme.breakpoints.mobile} {
    margin: 80px 1em;
    padding: 1em;
  }
`
const SponsorBox = styled.div`
  margin-top: 80px;
  padding: 100px 0;
  background-color: ${({ theme }) => theme.colors.baseDimmed};
`

export default function IndexPage() {
  const { t } = useTranslation()
  const { allSpeakersYaml, allSponsorsYaml } = useStaticQuery(graphql`
    query {
      allSpeakersYaml(filter: { featured: { eq: true } }) {
        edges {
          node {
            featured
            name
            github
            twitter
            photoURL
            talkTitle
          }
        }
      }
      allSponsorsYaml {
        edges {
          node {
            name
            grade
            url
            logoUrl
          }
        }
      }
    }
  `)
  const guestSpeakers = allSpeakersYaml.edges.map(({ node }) => node)
  const sponsors = allSponsorsYaml.edges.map(({ node }) => node)

  return (
    <Layout>
      <WavyBox>
        <SEO title="Home" />
        <Centerize>
          <Hero
            title={t("siteName")}
            subTitle={t("festivalPeriod")}
            description={t("description")}
          />
        </Centerize>

        <Card>
          <SubTitle>{t("guestSpeakers")}</SubTitle>
          <SpeakerList speakers={guestSpeakers} />
          <Centerize>
            <LinkButton color="primary" to="/speakers">
              {t("goToGuests")}
            </LinkButton>
          </Centerize>
        </Card>

        <Centerize>
          <SubTitle>{t("schedule")}</SubTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 910,
            }}
          >
            <LinkButton color="secondary" size="large" to="/timetable#day1">
              {t("day1")}
            </LinkButton>
            <LinkButton color="secondary" size="large" to="/timetable#day2">
              {t("day2")}
            </LinkButton>
          </div>
        </Centerize>

        <Card>
          <Centerize>
            <SubTitle>{t("tickets")}</SubTitle>
            <p>{t("ticketsDescription")}</p>
            <Centerize>
              <LinkButton
                // color="primary"
                size="large"
                to="#"
                disabled
              >
                {t("comingSoon")}
              </LinkButton>
            </Centerize>
          </Centerize>
        </Card>

        <Centerize>
          <SubTitle>{t("venue")}</SubTitle>
          <Map width={940} height={500} />
          <Address />
          <Centerize>
            <LinkButton color="primary" to="/venue">
              {t("moreDetails")}
            </LinkButton>
          </Centerize>
        </Centerize>

        <SponsorBox>
          <Centerize>
            <SubTitle>{t("sponsors")}</SubTitle>
            <SponsorList sponsors={sponsors} />
          </Centerize>
        </SponsorBox>
      </WavyBox>
    </Layout>
  )
}
