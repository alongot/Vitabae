import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import CustomOrder from './pages/CustomOrder';
import FAQ from './pages/FAQ';
import GlucoseGoddess from './pages/GlucoseGoddess';
import Home from './pages/Home';
import InnerCircle from './pages/InnerCircle';
import Labs from './pages/Labs';
import Library from './pages/Library';
import OurProcess from './pages/OurProcess';
import OurStory from './pages/OurStory';
import PersonalizationResults from './pages/PersonalizationResults';
import Product from './pages/Product';
import Professional from './pages/Professional';
import Profile from './pages/Profile';
import Science from './pages/Science';
import Team from './pages/Team';
import WhyExpensive from './pages/WhyExpensive';
import WhyPremium from './pages/WhyPremium';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Blog": Blog,
    "Cart": Cart,
    "Collection": Collection,
    "CustomOrder": CustomOrder,
    "FAQ": FAQ,
    "GlucoseGoddess": GlucoseGoddess,
    "Home": Home,
    "InnerCircle": InnerCircle,
    "Labs": Labs,
    "Library": Library,
    "OurProcess": OurProcess,
    "OurStory": OurStory,
    "PersonalizationResults": PersonalizationResults,
    "Product": Product,
    "Professional": Professional,
    "Profile": Profile,
    "Science": Science,
    "Team": Team,
    "WhyExpensive": WhyExpensive,
    "WhyPremium": WhyPremium,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};