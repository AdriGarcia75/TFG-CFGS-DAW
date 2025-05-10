import React, { useState, useEffect } from 'react';
import DashboardView from '../components/DashboardView';

export default function Dashboard() {
	const [columns, setColumns] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchColumns() {
			try {
				const response = await fetch('/api/columns');
				if (!response.ok) {
					throw new Error('Error al obtener las columnas');
				}
				const data = await response.json();
				setColumns(data);
				setLoading(false);
			} catch (error) {
				console.error('Error al cargar las columnas:', error);
				setLoading(false);
			}
		}

		fetchColumns();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Cargando...</p>
			</div>
		);
	}

	return <DashboardView columns={columns} />;
}
