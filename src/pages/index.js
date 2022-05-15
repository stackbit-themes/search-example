import React from "react";
import { sourcebitDataClient } from "sourcebit-target-next";
import { withRemoteDataUpdates } from "sourcebit-target-next/with-remote-data-updates";
import { staticPropsFor } from "../utils/static-props-helper";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "instantsearch.css/themes/satellite.css";
import HomepageHeader from "../components/HomepageHeader";
import BaseLayout from "../components/BaseLayout";
import { ThemeCard } from "../components/ThemeCard";
import { AlertBox } from "../components/AlertBox";

const searchLabel = "Search frameworks, authors or anything...";
let searchClient = null;
let searchIndexName = null;
if (
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY &&
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
) {
  searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  searchIndexName =
    process.env.NODE_ENV + "_" + process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
}

function Homepage(props) {
  const { page, site } = props;
  return (
    <BaseLayout page={page} site={site}>
      <HomepageHeader {...props} />
      <div className="mx-[2.5%]">
        {searchClient ? (
          <ThemeSearch />
        ) : (
          <AlertBox message="Please set environment variables for Algolia and then restart Next.js via Project Settings->Advanced." />
        )}
      </div>
    </BaseLayout>
  );
}

function ThemeSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName={searchIndexName}>
      <div className="card shadow bg-base-100">
        <div className="card-body p-[2.5%]">
          <SearchBox translations={{ placeholder: searchLabel }} />
          <Hits hitComponent={ThemeCard} />
        </div>
      </div>
    </InstantSearch>
  );
}

function countThemes(data) {
  const allThemes = data.objects.filter(
    (content) => content.layout == "JamstackTheme"
  );
  const enabledThemes = allThemes.filter((theme) => !theme.disabled);
  return { all: allThemes.length, enabled: enabledThemes.length };
}

export async function getStaticProps({ params }) {
  const data = await sourcebitDataClient.getData();
  const props = await staticPropsFor("/", data);
  props.themeCounts = countThemes(data);
  return { props };
}

export default withRemoteDataUpdates(Homepage);
