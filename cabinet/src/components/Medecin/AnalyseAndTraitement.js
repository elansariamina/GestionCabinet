import React, { useState } from 'react';
import ListMedecaments from './ListMedecaments';
import ListAnalyses from './ListAnalyses';
import jsPDF from 'jspdf';
import axios from 'axios';
import cachet from '../../assets/images/cachet.jpg';
import logoImage from '../../assets/images/logo.jpg';


function AnalyseAndTraitement({ patientId, accessToken, doctorId }) {
    const [checkedOptions, setCheckedOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([
        {
            name: '',
            fois: '',
            period: '',
          },
    ])
    const [rows, setRows] = useState([
        {
          selectedMedicament: null,
          foisOptions: [],
          periodeOptions: [],
        },
      ]);
    
      const handleMedicamentChange = (medicamentName, rowIndex) => {
        const selectedMedication = ListMedecaments.find((med) =>
          med.medicaments.some((medication) => {if(medication.name === medicamentName) {
            setSelectedOptions((prevSelectedOptions) => {
                const newOptions = [...prevSelectedOptions];
                newOptions[rowIndex] = {
                    name: medication.name,
                    fois: medication.fois,
                    period: medication.periode,
                };
                return newOptions;
            })
            return true;
        }})
        );
    
        setRows((prevRows) => {
          const newRows = [...prevRows];
          newRows[rowIndex] = {
            selectedMedicament: selectedMedication,
            foisOptions: Array.from(
              new Set(selectedMedication.medicaments.map((medication) => medication.fois))
            ),
            periodeOptions: Array.from(
              new Set(selectedMedication.medicaments.map((medication) => medication.periode))
            ),
          };
          return newRows;
        });
      };
    
      const addRow = () => {
        setRows((prevRows) => [
          ...prevRows,
          {
            selectedMedicament: null,
            foisOptions: [],
            periodeOptions: [],
          },
        ]);
      };
      const handleCheckboxChange = (optionName) =>{
        setCheckedOptions((prevCheckedOptions) => {
            if (prevCheckedOptions.includes(optionName)){
                return prevCheckedOptions.filter((opt)=> opt!== optionName );
            }else{
                return [...prevCheckedOptions , optionName ];
            }
        });
      };

      const generateAnalysePDF = async () => {
        const pdf = new jsPDF();
        
        pdf.setFillColor(72, 78, 94); 
        pdf.setTextColor(255, 255, 255);
        pdf.rect(0, 0, pdf.internal.pageSize.width, 20, 'F');
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Listes des analyses', 10, 15);

        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica');

        pdf.text('Cabinet el-AMAL', 30, 30);
        pdf.text('0643651756', 30, 40);
        pdf.text('email@assistant.ma', 30, 50);
        pdf.addImage(logoImage, 'JPG', 150, 20, 40, 40, 30);

        pdf.setFontSize(14);

        checkedOptions.forEach((option, index) => {
          pdf.text(` - ${option} `, 30, 80 + (12 * index));
        });

        pdf.addImage(cachet, 'JPG', 150 , 80 + (12 * checkedOptions.length) + 10, 40, 40);

        const currentDate = new Date().toLocaleDateString();
        pdf.text(`Doctor: ${JSON.parse(localStorage.getItem('doctor')).name} | Date: ${currentDate}`, 10, pdf.internal.pageSize.height - 10);

        pdf.save('analyses.pdf');

        const pdfData = pdf.output('arraybuffer');
        const blob = new Blob([pdfData], { type: 'application/pdf' });

        const formData = new FormData();
        formData.append('patientId', patientId);
        formData.append('doctorId', doctorId);
        formData.append('type', 'analyse');
        formData.append('file', blob, 'analyses.pdf');

        try {
          const response = await axios.post('http://localhost:3001/api/doctors/storeMedicalDoc', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log('Response:', response.data);

        } catch (error) {
          console.error('Error storing PDF on the server:', error);
        }
        
      };
      

      const generateOrdonancePDF = async () => {
        
        const pdf = new jsPDF();
        
        pdf.setFillColor(72, 78, 94); 
        pdf.setTextColor(255, 255, 255);
        pdf.rect(0, 0, pdf.internal.pageSize.width, 20, 'F');
        pdf.setFontSize(24);
        pdf.setFont('helvetica');
        pdf.text('Ordonnance', 10, 15);

        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica');

        pdf.text('Cabinet el-AMAL', 30, 30);
        pdf.text('0643651756', 30, 40);
        pdf.text('email@assistant.ma', 30, 50);
        pdf.addImage(logoImage, 'JPG', 150, 20, 40, 40, 30);

        pdf.setFontSize(14);

        
        selectedOptions.forEach((row,index )=>{
            pdf.text(`- ${row.name}      ${row.fois} fois/jour     ${row.period}`, 30, 80 + (12 * index));
        });

        pdf.addImage(cachet, 'JPG', 150 , 100 + (12 * selectedOptions.length) + 10, 40, 40);

        const currentDate = new Date().toLocaleDateString();
        pdf.text(`Doctor: ${JSON.parse(localStorage.getItem('doctor')).name} | Date: ${currentDate}`, 10, pdf.internal.pageSize.height - 10);

        pdf.save(`ordonnance.pdf`);


        const pdfData = pdf.output('arraybuffer');
        const blob = new Blob([pdfData], { type: 'application/pdf' });

        const formData = new FormData();
        formData.append('patientId', patientId);
        formData.append('doctorId', doctorId);
        formData.append('type', 'ordonnance');
        formData.append('file', blob, 'ordonnance.pdf');

        try {
          const response = await axios.post('http://localhost:3001/api/doctors/storeMedicalDoc', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log('Response:', response.data);

        } catch (error) {
          console.error('Error storing PDF on the server:', error);
        }
        
      }

  return (
    <>
      <div>
        
        <div className='m-8 p-4 rounded-lg' style={{ boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.3)' }}>
          <h1 className="text-xl font-bold mb-4">Analyse</h1>
          <form className='flex'>
            {ListAnalyses.map((category) => (
              <label key={category.category} className='flex flex-wrap mx-4'>
                <span className='text-lg font-semibold text-gray-500'>{category.category}: </span>
                {category.options.map((option) => (
                  <label key={option.name} className='w-full'>
                    <input name={option.name} type="checkbox" checked={checkedOptions.includes(option.name)} onChange={() => handleCheckboxChange(option.name)}/>
                    {option.name}
                  </label>
                ))}
              </label>
            ))}
          </form>
          <div className='flex justify-end'>
            <button className='bg-purple-300 rounded-lg font-semibold py-1 px-2 m-4 cursor-pointer' onClick={generateAnalysePDF}>Générer les analyses</button>
          </div>
        </div>

        <div className='m-8 p-4 rounded-lg' style={{ boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.3)' }}>
        <h1 className="text-xl font-bold mb-4">Traitement</h1>
        {rows.map((row, index) => (
            <form key={index} className='flex my-4'>
              <label className='mx-4'>
                Médicament:
                <select
                  className='border p-1 ml-2'
                  onChange={(e) => handleMedicamentChange(e.target.value, index)}
                >
                  <option hidden>Choisir un medicament</option>
                  {ListMedecaments.map((med) =>
                    med.medicaments.map((medication) => (
                      <option key={medication.name}>{medication.name}</option>
                    ))
                  )}
                </select>
              </label>

              <label className='mx-4'>
                Nombre de fois par jour:
                <select className='border p-1 ml-2'>
                  <option hidden>Choisir</option>
                  {row.foisOptions.map((fois, index) => (
                    <option key={index}>{fois}</option>
                  ))}
                </select>
              </label>

              <label className='mx-4'>
                Période à prendre:
                <select className='border p-1 ml-2'>
                  <option hidden>Choisir</option>
                  {row.periodeOptions.map((periode, index) => (
                    <option key={index}>{periode}</option>
                  ))}
                </select>
              </label>
            </form>
        ))}
        <button className='rounded-full bg-black text-white font-bold text-lg py-1 px-3 m-4' onClick={addRow}>+</button>
          <div className='flex justify-end'>
            <button className='bg-purple-300 rounded-lg font-semibold py-1 px-2 m-4 cursor-pointer' onClick={generateOrdonancePDF}>Générer l'ordonnance</button>
          </div>
          </div>
        </div>
    </>
  );
}

export default AnalyseAndTraitement;
