import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { homePage } from './schemas/homePage'
import { businessPage } from './schemas/businessPage'
import { businessVerticalsPage } from './schemas/businessVerticals'
import { projectsPage } from './schemas/projectsPage'
import { navigation } from './schemas/navigation'
import { footer } from './schemas/footer'
import { aboutPage } from './schemas/aboutPage'
import { administrationPage } from './schemas/administrationPage'
import { careersPage } from './schemas/careersPage'
import { contactPage } from './schemas/contactPage'
import { sustainabilityPage } from './schemas/sustainabilityPage'
import { investorsPage } from './schemas/investorsPage'
import { eventsPage } from './schemas/eventsPage'
import { getInTouchPage } from './schemas/getInTouchPage'
import { insightsPage } from './schemas/insightsPage'
import { internshipPage } from './schemas/internshipPage'
import { technologiesPage } from './schemas/technologiesPage'
import { locationsPage } from './schemas/locationsPage'
import { privacyPolicyPage } from './schemas/privacyPolicyPage'
import { termsAndConditionsPage } from './schemas/termsAndConditionsPage'
import { scrollingAnnouncementBar } from './schemas/scrollingAnnouncementBar'
import { preloaderPage } from './schemas/preloaderPage'
import { servicesPage } from './schemas/servicesPage'

export default defineConfig({
    name: 'default',
    title: 'CopterCode Studio',

    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,

    basePath: '/studio',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: [homePage, businessPage, businessVerticalsPage, projectsPage, navigation, footer, aboutPage, administrationPage, careersPage, contactPage, sustainabilityPage, investorsPage, eventsPage, getInTouchPage, insightsPage, internshipPage, technologiesPage, locationsPage, privacyPolicyPage, termsAndConditionsPage, scrollingAnnouncementBar, preloaderPage, servicesPage],
    },
})
