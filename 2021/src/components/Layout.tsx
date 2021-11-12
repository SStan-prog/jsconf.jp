import React, { useCallback } from "react"
import styled, { ThemeProvider } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import { theme } from "../theme"
import { Header } from "./Header"
import { HeaderMobile } from "./HeaderMobile"
import { Footer } from "./Footer"
import { Button } from "./Button"
import { SmoothScroll } from "./SmoothScroll"
import "./layout.css"

type Props = {
  children: React.ReactNode
}

const MainBox = styled.div`
  position: relative;
`
const BackToTopBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 40px;
`
const OnlyMobile = styled.div`
  ${({ theme }) => theme.breakpoints.largerThanMobile} {
    display: none;
  }
`
const NotMobile = styled.div`
  ${({ theme }) => theme.breakpoints.mobile} {
    display: none;
  }
`

export function Layout({ children }: Props) {
  const { t, i18n } = useTranslation()
  const onChangeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
    },
    [i18n]
  )
  const {
    site,
    allSponsorsYaml,
    allTalksYaml,
    allSpeakersYaml
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          twitter
          ticketUrl
          sponsorFormUrl
          cfpFormUrl
        }
      }
      allSponsorsYaml {
        totalCount
      }
      allTalksYaml {
        totalCount
      }
      allSpeakersYaml {
        totalCount
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <>
        <OnlyMobile>
          <HeaderMobile
            siteTitle={site.siteMetadata.title}
            ticketUrl={site.siteMetadata.ticketUrl}
            enableSpeakers={allSpeakersYaml.totalCount > 0}
            enableSchedule={allTalksYaml.totalCount > 0}
            enableSponsors={allSponsorsYaml.totalCount > 0}
            onChangeLanguage={onChangeLanguage}
          />
        </OnlyMobile>
        <NotMobile>
          <Header
            siteTitle={site.siteMetadata.title}
            ticketUrl={site.siteMetadata.ticketUrl}
            enableSpeakers={allSpeakersYaml.totalCount > 0}
            enableSchedule={allTalksYaml.totalCount > 0}
            enableSponsors={allSponsorsYaml.totalCount > 0}
            onChangeLanguage={onChangeLanguage}
          />
        </NotMobile>
        <MainBox>
          <main>{children}</main>
          <BackToTopBox>
            <SmoothScroll selector="body">
              <Button color="primary">{t("backToTop")}</Button>
            </SmoothScroll>
          </BackToTopBox>
        </MainBox>
        <Footer />
      </>
    </ThemeProvider>
  )
}
