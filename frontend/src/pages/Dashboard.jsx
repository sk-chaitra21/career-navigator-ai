import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api/api";
import StatCard from "../components/StatCard";

function Dashboard() {

  const [domains, setDomains] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {

      const response = await api.get("/domains");

      setDomains(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <MainLayout>

      <>
<h1>Dashboard</h1>

<p
style={{
marginBottom:"30px",
color:"#666"
}}
>
Welcome to Career Navigator AI
</p>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginBottom:"40px"
}}
>

<StatCard
title="Domains"
value={domains.length}
color="#4F46E5"
/>

<StatCard
title="Roles"
value="12"
color="#06B6D4"
/>

<StatCard
title="Skills"
value="48"
color="#22C55E"
/>

<StatCard
title="Companies"
value="70"
color="#F59E0B"
/>

</div>

<h2>Explore Domains</h2>

<br/>

<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",
gap:"25px",
}}
>

{domains.map((domain)=>(

<div
key={domain.id}
onClick={()=>navigate(`/roles/${domain.id}`)}
style={{
background:"white",
padding:"25px",
borderRadius:"16px",
cursor:"pointer",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}
>

<h2>{domain.name}</h2>

<p>{domain.description}</p>

</div>

))}

</div>
</>

    </MainLayout>

  );
}

export default Dashboard;