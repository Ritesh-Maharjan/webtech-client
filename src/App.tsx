import Hero from "./component/Hero"
import Service from "./component/Service";

function App() {

  const restBase = `https://riteshmaharjan.com/webtech/wp-json/wp/v2/`;
  return (
    <div className="bg-black text-white">
      <Hero />
      <Service restBase={restBase} />
    </div>
  )
}

export default App
