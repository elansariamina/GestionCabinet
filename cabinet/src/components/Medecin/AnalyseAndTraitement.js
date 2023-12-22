import React, { useState } from 'react';
import ListMedecaments from './ListMedecaments';
import ListAnalyses from './ListAnalyses';
import jsPDF from 'jspdf';
import axios from 'axios';


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
        pdf.text('Checked Options', 10, 10);
        checkedOptions.forEach((option, index) => {
          pdf.text(` - ${option} `, 20, 20 + (10 * index));
        });
        
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
        pdf.text(`Ordonance`, 10,10);
        selectedOptions.forEach((row,index )=>{
            pdf.text(`- ${row.name}      ${row.fois} fois/jour     ${row.period}`, 20, 20 + (10 * index));
        });
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