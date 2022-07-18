import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="Browse a list of React meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </Fragment>
  );
}

//runs on the server after deployment
// export async function getServerSideProps(context) {
//   //fetch data from an api

//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// exexuted during build process. not on the client

export async function getStaticProps() {
  // fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://TziovanisUvenis:Splitsecond27@nextcluster.2eiqf.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetupcollection");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
