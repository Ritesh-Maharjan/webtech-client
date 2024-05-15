import Hero from "./component/Hero"
import Service from "./component/Service";
import About from "./component/About";

function App() {

  const restBase = `https://riteshmaharjan.com/webtech/wp-json/wp/v2/`;
  return (
    <div className="bg-black text-white">
      <Hero />
      <Service restBase={restBase} />
			<About restBase={restBase} />
    </div>
  )
}

export default App