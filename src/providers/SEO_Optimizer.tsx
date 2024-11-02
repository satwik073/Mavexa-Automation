
import { Helmet } from 'react-helmet-async';

interface AdvancedSEOProps {
  primaryTitle: string;
  primaryDescription: string;
  canonicalURL: string;
  metaImageURL: string;
  additionalKeywords?: string;
  schemaEntityType?: 'Organization' | 'WebPage' | 'Article' | 'Product' | 'BlogPosting';
  contentAuthor?: string;
  contentPublisher?: string;
  publicationDate?: string;
  lastModifiedDate?: string;
  localizedLanguageRegion?: string;
  twitterHandleAlias?: string;
  facebookApplicationID?: string;
}

interface MetaElement {
  metaName?: string;
  metaProperty?: string;
  metaContent: string;
}

const { VITE_APP_PRODUCT } = import.meta.env
const { VITE_APP_DEFAULT_IMAGE } = import.meta.env
const { VITE_APP_JSON_LD_ORG }= import.meta.env
const generateMetaElement = (
  metaIdentifier: string,
  metaContentValue: string | undefined,
  isPropertyAttribute = false
): MetaElement | null => {
  if (!metaContentValue) return null;
  return isPropertyAttribute
    ? { metaProperty: metaIdentifier, metaContent: metaContentValue }
    : { metaName: metaIdentifier, metaContent: metaContentValue };
};

const SEO_Module_Optimizer = ({
  primaryTitle,
  primaryDescription,
  canonicalURL,
  metaImageURL,
  additionalKeywords,
  schemaEntityType = 'WebPage',
  contentAuthor,
  contentPublisher,
  publicationDate,
  lastModifiedDate,
  localizedLanguageRegion = 'en_US',
  twitterHandleAlias = '@mavexa',
  facebookApplicationID
}: AdvancedSEOProps) => {
  const structuredDataSchemaObject: Record<string, any> = {
    "@context": VITE_APP_JSON_LD_ORG,
    "@type": schemaEntityType,
    "url": canonicalURL,
    "image": metaImageURL,
    "name": primaryTitle,
    "description": primaryDescription,
    "logo": metaImageURL,
    "sameAs": [
      "https://twitter.com/mavexa",
      "https://www.linkedin.com/company/mavexa"
    ],
    "author": contentAuthor ? { "@type": "Person", "name": contentAuthor } : undefined,
    "publisher": contentPublisher
      ? {
          "@type": "Organization",
          "name": contentPublisher,
          "logo": {
            "@type": "ImageObject",
            "url": metaImageURL
          }
        }
      : undefined,
    "datePublished": publicationDate,
    "dateModified": lastModifiedDate,
  };

  if (schemaEntityType === 'Article' || schemaEntityType === 'BlogPosting') {
    structuredDataSchemaObject.author = { "@type": "Person", "name": contentAuthor };
    structuredDataSchemaObject.publisher = {
      "@type": "Organization",
      "name": contentPublisher,
      "logo": metaImageURL,
    };
    structuredDataSchemaObject.datePublished = publicationDate;
    structuredDataSchemaObject.dateModified = lastModifiedDate || publicationDate;
  }


  const metaElementsArray: MetaElement[] = [
    generateMetaElement("description", primaryDescription),
    generateMetaElement("robots", "index, follow"),
    generateMetaElement("keywords", additionalKeywords),
    generateMetaElement("og:title", primaryTitle, true),
    generateMetaElement("og:description", primaryDescription, true),
    generateMetaElement("og:image", metaImageURL, true),
    generateMetaElement("og:url", canonicalURL, true),
    generateMetaElement("og:type", "website", true),
    generateMetaElement("og:site_name", VITE_APP_PRODUCT, true),
    generateMetaElement("og:locale", localizedLanguageRegion, true),
    generateMetaElement("fb:app_id", facebookApplicationID, true),
    generateMetaElement("twitter:card", VITE_APP_DEFAULT_IMAGE),
    generateMetaElement("twitter:title", primaryTitle),
    generateMetaElement("twitter:description", primaryDescription),
    generateMetaElement("twitter:image", metaImageURL),
    generateMetaElement("twitter:site", twitterHandleAlias),
    generateMetaElement("twitter:creator", twitterHandleAlias),
    generateMetaElement("al:ios:url", canonicalURL, true),
    generateMetaElement("al:android:url", canonicalURL, true),
    generateMetaElement("al:ios:app_name", VITE_APP_PRODUCT, true),
    generateMetaElement("al:android:app_name", VITE_APP_PRODUCT, true),
    generateMetaElement("pinterest-rich-pin", "true"),
    generateMetaElement("theme-color", "#ffffff"),
  ].filter((element): element is MetaElement => element !== null);

  return (
    <Helmet>
      <title>{primaryTitle}</title>
      <link rel="canonical" href={canonicalURL} />
      {metaElementsArray.map((metaElement, idx) => (
        <meta
          key={idx}
          {...(metaElement.metaName ? { name: metaElement.metaName } : { property: metaElement.metaProperty })}
          content={metaElement.metaContent}
        />
      ))}
      <script type="application/ld+json">
        {JSON.stringify(structuredDataSchemaObject)}
      </script>
    </Helmet>
  );
};

export default SEO_Module_Optimizer;
