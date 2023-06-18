
export function fetchCount() {
  return new Promise(async (req,res) => {
    const data = await fetch(`http://localhost:8080`);
    data = await data.json();
    res.send(data);
  });
}
