import Image from "next/image";

// Types for the data
interface Contest {
  id: string;
  name: string;
  image: string;
  description: string;
  status: "upcoming" | "past";
}

interface Ranking {
  id: string;
  name: string;
  points: number;
  image: string;
}

// Sample data
const contests: Contest[] = [
  {
    id: "1",
    name: "Weekly Contest 353",
    image: "/aims/2.jpg",
    description: "Participate in our weekly contest with new challenges.",
    status: "upcoming",
  },
  {
    id: "2",
    name: "Weekly Contest 353",
    image: "/aims/2.jpg",
    description: "Participate in our weekly contest with new challenges.",
    status: "upcoming",
  },
  // ...more contests
];

const rankings: Ranking[] = [
  {
    id: "1",
    name: "John Doe",
    points: 1500,
    image: "/aims/1.jpg",
  },
  {
    id: "2",
    name: "John Doe",
    points: 1500,
    image: "/aims/1.jpg",
  },
  // ...more rankings
];

// Contest card component
const ContestCard: React.FC<Contest> = ({ name, image, description }) => {
  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <Image
        src={image}
        alt={name}
        className="rounded-lg"
        width={400}
        height={180}
      />
      <div className="p-4">
        <h5 className="text-lg font-bold">{name}</h5>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Ranking component
const RankingCard: React.FC<Ranking> = ({ name, points, image }) => {
  return (
    <div className="flex justify-between items-center p-4 shadow-lg rounded-lg bg-white my-2">
      <div className="flex items-center">
        <Image
          src={image}
          alt={name}
          className="rounded-lg"
          width={80}
          height={50}
        />
        <div className="ml-4">
          <h5 className="text-lg font-bold">{name}</h5>
          <p className="text-sm text-gray-600">{points} points</p>
        </div>
      </div>
      <div>
        <div>
          <p className="text-sm text-gray-600">{points} Marks</p>
        </div>
      </div>
    </div>
  );
};

// ContestPage component
const ContestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Contest</h2>
          <nav>
            <ul className="flex flex-col">
              {contests.map((contest) => (
                <li key={contest.id}>
                  <a href="#" className="text-lg text-blue-500 hover:underline">
                    {contest.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-span-3">
          <section>
            <h3 className="text-xl font-bold mb-4">Featured Contests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contests
                .filter((contest) => contest.status === "upcoming")
                .map((contest) => (
                  <ContestCard key={contest.id} {...contest} />
                ))}
            </div>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-bold mb-4">Global Ranking</h3>
            {rankings.map((ranking) => (
              <RankingCard key={ranking.id} {...ranking} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
