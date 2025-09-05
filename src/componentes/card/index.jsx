import React, { useState, useEffect } from "react";
import { FaChartBar } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaChartGantt } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { LuChartNetwork } from "react-icons/lu";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { FaChartArea } from "react-icons/fa";
import { MdPieChart } from "react-icons/md";
import { TbChartDots } from "react-icons/tb";
import { BiLineChart } from "react-icons/bi";
import { BiScatterChart } from "react-icons/bi";
import { PiChartLineBold } from "react-icons/pi";
import { TfiBarChartAlt } from "react-icons/tfi";
import { TbChartScatter } from "react-icons/tb";
import { TbChartHistogram } from "react-icons/tb";
import './card.css'
const Card = ({icono='', titulo='', descripcion='', urlPowerBI='www', colorIcono=''}) =>{
    const navigate = useNavigate();
    const renderIcon = (color) => {
        switch(icono){
            case "FaChartBar": return <FaChartBar  size={55} style={{color:color}}/>;
            case "FaChartPie": return <FaChartPie  size={55} style={{color:color}}/>;
            case "FaChartGantt": return <FaChartGantt  size={55} style={{color:color}}/>;
            case "FaChartLine": return <FaChartLine  size={55} style={{color:color}}/>;
            case "LuChartNetwork": return <LuChartNetwork  size={55} style={{color:color}}/>;
            case "LuChartNoAxesCombined": return <LuChartNoAxesCombined  size={55} style={{color:color}}/>;
            case "FaChartArea": return <FaChartArea  size={55} style={{color:color}}/>;
            case "MdPieChart": return <MdPieChart size={55} style={{color:color}}/>;
            case "TbChartDots": return <TbChartDots  size={55} style={{color:color}}/>;
            case "BiLineChart": return <BiLineChart  size={55} style={{color:color}}/>;
            case "BiScatterChart": return <BiScatterChart  size={55} style={{color:color}}/>;
            case "PiChartLineBold": return <PiChartLineBold  size={55} style={{color:color}}/>;
            case "TfiBarChartAlt": return <TfiBarChartAlt  size={55} style={{color:color}}/>;
            case "TbChartScatter": return <TbChartScatter  size={55} style={{color:color}}/>;
            case "TbChartHistogram": return <TbChartHistogram  size={55} style={{color:color}}/>;
            default: return null
        }
    }
    const colorico = colorIcono ? colorIcono :'#1E88E5'
    const isValidUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch (_) {
          return false;
        }
      };
      const handleClick = () => {
        if (isValidUrl(urlPowerBI)) {
          navigate("/reporte", { state: { url: urlPowerBI } });
        } else {
            toast.error("Este reporte no tiene una URL válida.");
        }
      };

    return (
<div
  className="custom-card text-center shadow-sm p-4 rounded h-100"
  style={{ cursor: "pointer" }}
  onClick={handleClick}
>
  <div className="icon-container mb-3">{renderIcon(colorico)}</div>
  <h6 className="card-title fw-bold">{titulo}</h6>
  <p className="card-description text-muted">{descripcion}</p>
</div>
      );

}
export default Card; 