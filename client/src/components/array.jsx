import React from 'react'

function array() {

    const Cars = [

        { id: 1, name: "Toyota Camry", country: "Japan" },
        { id: 2, name: "Ford Mustang", country: "USA" },
        { id: 3, name: "BMW 3 Series", country: "Germany" },
        { id: 4, name: "Honda Accord", country: "Japan" },
        { id: 5, name: "Chevrolet Corvette", country: "USA" },
        { id: 6, name: "Audi A4", country: "Germany" },
        { id: 7, name: "Mercedes-Benz C-Class", country: "Germany" },
        { id: 8, name: "Hyundai Sonata", country: "South Korea" },
        { id: 9, name: "Volkswagen Passat", country: "Germany" },
        { id: 10, name: "Kia Optima", country: "South Korea" }

    ];
    console.log(Cars)
    return (
        <div>
            <div className='Show-car'>
                <table>
                    <thead>
                        <tr
                            style={{background:'lightgray'}}
                        >
                            <td>ID</td>
                            <td>Name</td>
                            <td>Country</td>
                        </tr>
                    </thead>
                    {Cars.map(car => (
                        <tbody>
                            <tr
                                 style={{
                                    backgroundColor: car.id %2 === 0 ? '#f3f3f3' : 'transparent'
                                }}
                            >
                                <td>{car.id}</td>
                                <td>{car.name}</td>
                                <td>{car.country}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default array
