// ==========================================
// 1. Autenticación y Estado Global
// ==========================================
const token = localStorage.getItem('mediflow_token');
let rol = null;
let currentUserEmail = null;

if (!token) window.location.href = './index.html';

const API_URL = 'http://localhost:4000/api';

// Cache de datos para no hacer fetch repetidos en el cliente (MVP)
let globalData = { citas: [], medicos: [], pacientes: [], historiales: [] };

fetch(`${API_URL}/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } })
.then(res => { if (!res.ok) throw new Error("No autorizado"); return res.json(); })
.then(data => {
    rol = data.rol;
    currentUserEmail = data.email;
    document.getElementById('user-role-display').textContent = rol;
    document.getElementById('user-initial').textContent = rol.charAt(0).toUpperCase();
    fetchAllData().then(() => renderMenu());
})
.catch(err => {
    localStorage.removeItem('mediflow_token');
    window.location.href = './index.html';
});

async function fetchAllData() {
    try {
        const [citas, medicos, pacientes, historiales] = await Promise.all([
            fetch(`${API_URL}/citas`).then(res => res.json()),
            fetch(`${API_URL}/medicos`).then(res => res.json()),
            fetch(`${API_URL}/pacientes`).then(res => res.json()),
            fetch(`${API_URL}/historial`).then(res => res.json())
        ]);
        globalData.citas = citas.data || [];
        globalData.medicos = medicos.data || [];
        globalData.pacientes = pacientes.data || [];
        globalData.historiales = historiales.data || [];
    } catch(e) { console.error("Error cargando datos", e); }
}

// ==========================================
// 2. Dark Mode & Logout
// ==========================================
const htmlElement = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
});
document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('mediflow_token');
    window.location.href = './index.html';
});

// ==========================================
// 3. Configuración del Menú
// ==========================================
const menuConfig = {
    admin: [
        { id: 'resumen', title: 'Dashboard', icon: 'fa-chart-pie', action: loadResumenAdminView },
        { id: 'todas-citas', title: 'Todas las Citas', icon: 'fa-list-alt', action: loadTodasCitasView },
        { id: 'agendar', title: 'Calendario Citas', icon: 'fa-calendar-alt', action: loadCalendarioView },
        { id: 'medicos', title: 'Médicos', icon: 'fa-user-md', action: loadMedicosView },
        { id: 'pacientes', title: 'Pacientes', icon: 'fa-users', action: loadPacientesView },
        { id: 'historial', title: 'Historial Clínico', icon: 'fa-notes-medical', action: loadHistorialesView }
    ],
    medico: [
        { id: 'resumen', title: 'Dashboard', icon: 'fa-chart-pie', action: loadResumenMedicoView },
        { id: 'agendar', title: 'Mi Calendario', icon: 'fa-calendar-alt', action: loadCalendarioView },
        { id: 'historial', title: 'Buscar Historiales', icon: 'fa-notes-medical', action: loadHistorialesView }
    ],
    paciente: [
        { id: 'resumen', title: 'Dashboard', icon: 'fa-chart-pie', action: loadResumenPacienteView },
        { id: 'agendar', title: 'Agendar Cita', icon: 'fa-calendar-alt', action: loadCalendarioView },
        { id: 'mi-historial', title: 'Mi Historial', icon: 'fa-file-medical', action: loadHistorialesView }
    ]
};

const sidebarMenu = document.getElementById('sidebar-menu');
const viewContainer = document.getElementById('view-container');

function renderMenu() {
    const items = menuConfig[rol] || [];
    sidebarMenu.innerHTML = '';
    items.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = `w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`;
        btn.innerHTML = `<i class="fas ${item.icon} w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors"></i>${item.title}`;
        
        btn.addEventListener('click', () => {
            Array.from(sidebarMenu.children).forEach(c => {
                c.className = 'w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800';
                c.querySelector('i').className = `fas ${item.icon} w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors`;
            });
            btn.className = 'w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
            btn.querySelector('i').className = `fas ${item.icon} w-5 h-5 mr-3 text-blue-600 dark:text-blue-400 transition-colors`;
            document.getElementById('page-title').textContent = item.title;
            item.action(item.title);
        });
        sidebarMenu.appendChild(btn);
        if (index === 0) btn.click();
    });
}

// ==========================================
// Utils
// ==========================================
function getBadgeColor(estado) {
    if(estado === 'confirmada') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if(estado === 'pendiente') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    if(estado === 'cancelada') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
}

// ==========================================
// REQ 3: DASHBOARDS CON MÉTRICAS Y GRÁFICOS
// ==========================================
function loadResumenAdminView() {
    const totalCitas = globalData.citas.length;
    const canceladas = globalData.citas.filter(c => c.estado === 'cancelada').length;
    const tasaCanc = totalCitas > 0 ? Math.round((canceladas/totalCitas)*100) : 0;
    const pacientes = globalData.pacientes.length;
    const medicos = globalData.medicos.length;

    viewContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-500">Total Citas</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">${totalCitas}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-500">Pacientes Activos</p>
                <p class="text-3xl font-bold text-blue-600">${pacientes}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-500">Médicos Disp.</p>
                <p class="text-3xl font-bold text-green-600">${medicos}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-500">Tasa Cancelación</p>
                <p class="text-3xl font-bold text-red-600">${tasaCanc}%</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 class="font-bold mb-4">Citas por Estado</h3>
                <canvas id="chartEstados"></canvas>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 class="font-bold mb-4">Distribución Médicos</h3>
                <canvas id="chartMedicos"></canvas>
            </div>
        </div>
    `;

    // Render Charts
    const ctx1 = document.getElementById('chartEstados').getContext('2d');
    const estadosCount = {'pendiente':0, 'confirmada':0, 'cancelada':0, 'atendida':0};
    globalData.citas.forEach(c => { if(estadosCount[c.estado]!==undefined) estadosCount[c.estado]++; });
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Pendiente', 'Confirmada', 'Cancelada', 'Atendida'],
            datasets: [{ data: Object.values(estadosCount), backgroundColor: ['#facc15', '#4ade80', '#f87171', '#60a5fa'] }]
        }
    });

    const ctx2 = document.getElementById('chartMedicos').getContext('2d');
    const especialidades = {};
    globalData.medicos.forEach(m => { especialidades[m.especialidad] = (especialidades[m.especialidad]||0)+1; });
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Object.keys(especialidades),
            datasets: [{ label: 'Médicos', data: Object.values(especialidades), backgroundColor: '#8b5cf6' }]
        }
    });
}

function loadResumenPacienteView() {
    // Filtrar citas del paciente logueado (en un caso real se hace por backend, aquí usamos el mock email)
    // Para simplificar, buscamos el paciente cuyo email contenga parte del currentUserEmail
    const miUser = globalData.pacientes.find(p => currentUserEmail.includes(p.email.split('@')[0])) || globalData.pacientes[0];
    const misCitas = globalData.citas.filter(c => c.idPaciente === miUser.id);
    
    viewContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-md">
                <p class="text-sm opacity-80">Citas Pendientes</p>
                <p class="text-4xl font-bold mt-2">${misCitas.filter(c=>c.estado==='pendiente').length}</p>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-md">
                <p class="text-sm opacity-80">Citas Atendidas</p>
                <p class="text-4xl font-bold mt-2">${misCitas.filter(c=>c.estado==='atendida').length}</p>
            </div>
            <div class="bg-gradient-to-br from-gray-500 to-gray-700 text-white p-6 rounded-2xl shadow-md">
                <p class="text-sm opacity-80">Total Historiales</p>
                <p class="text-4xl font-bold mt-2">${globalData.historiales.filter(h=>h.idPaciente === miUser.id).length}</p>
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 class="font-bold mb-4 text-lg">Tus Próximas Citas</h3>
            <div class="space-y-4">
                ${misCitas.filter(c=>c.estado==='confirmada' || c.estado==='pendiente').map(c => `
                    <div class="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                        <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4"><i class="fas fa-calendar"></i></div>
                        <div class="flex-1">
                            <p class="font-bold">${c.fecha.split('T')[0]}</p>
                            <p class="text-sm text-gray-500">Con el médico: ${c.idMedico}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold text-gray-800 dark:text-gray-200">${c.horaInicio}</p>
                            <span class="text-xs px-2 py-1 rounded-full ${getBadgeColor(c.estado)}">${c.estado}</span>
                        </div>
                    </div>
                `).join('') || '<p class="text-gray-500">No tienes citas próximas agendadas.</p>'}
            </div>
        </div>
    `;
}

function loadResumenMedicoView() {
    const miMedico = globalData.medicos.find(m => currentUserEmail.includes(m.email.split('@')[0])) || globalData.medicos[0];
    const misCitas = globalData.citas.filter(c => c.idMedico === miMedico.id);
    
    viewContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-md">
                <p class="text-sm opacity-80">Pacientes Hoy</p>
                <p class="text-4xl font-bold mt-2">${misCitas.filter(c=>c.estado==='confirmada').length}</p>
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 class="font-bold mb-4 text-lg">Agenda del Día</h3>
            <div class="space-y-4">
                ${misCitas.map(c => `
                    <div class="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                        <div class="w-16 text-center border-r border-gray-200 dark:border-gray-700 mr-4 pr-4">
                            <p class="font-bold text-lg text-indigo-600 dark:text-indigo-400">${c.horaInicio.slice(0,5)}</p>
                        </div>
                        <div class="flex-1">
                            <p class="font-bold">Paciente ID: ${c.idPaciente}</p>
                            <p class="text-sm text-gray-500">Estado: <span class="${getBadgeColor(c.estado)} px-2 py-0.5 rounded-full text-xs">${c.estado}</span></p>
                        </div>
                        <button onclick="marcarAtendida('${c.id}')" class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors shadow-sm"><i class="fas fa-check mr-1"></i> Atender</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

window.marcarAtendida = async function(idCita) {
    Swal.fire({title: 'Procesando...', allowOutsideClick: false});
    Swal.showLoading();
    try {
        await fetch(`${API_URL}/citas/${idCita}/estado`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({estado: 'atendida'})
        });
        await fetchAllData();
        Swal.fire('Éxito', 'Cita marcada como atendida', 'success');
        loadResumenMedicoView();
    } catch(e) { Swal.fire('Error', e.message, 'error'); }
}


// ==========================================
// REQ 4: VISTA DE TODAS LAS CITAS PARA ADMIN (Tabla paginada y filtros)
// ==========================================
let currentPageCitas = 1;
function loadTodasCitasView() {
    renderTodasCitasTable();
}

function renderTodasCitasTable() {
    const itemsPerPage = 5;
    let filtered = globalData.citas;
    
    // Filtrado (simulado desde el HTML)
    const fPac = document.getElementById('filtPac')?.value.toLowerCase();
    const fMed = document.getElementById('filtMed')?.value.toLowerCase();
    if(fPac) filtered = filtered.filter(c => c.idPaciente.toLowerCase().includes(fPac));
    if(fMed) filtered = filtered.filter(c => c.idMedico.toLowerCase().includes(fMed));

    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const start = (currentPageCitas - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    let rowsHtml = paginated.map(cita => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b dark:border-gray-700">
            <td class="p-4 font-medium text-sm">${cita.fecha.split('T')[0]} <br> <span class="text-gray-500 text-xs">${cita.horaInicio}</span></td>
            <td class="p-4 text-sm font-semibold text-blue-600 dark:text-blue-400">${cita.idPaciente}</td>
            <td class="p-4 text-sm">${cita.idMedico}</td>
            <td class="p-4"><span class="px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(cita.estado)} uppercase">${cita.estado}</span></td>
        </tr>
    `).join('');

    if(paginated.length === 0) rowsHtml = `<tr><td colspan="4" class="p-6 text-center text-gray-500">No hay resultados</td></tr>`;

    viewContainer.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 flex gap-4 border border-gray-100 dark:border-gray-700">
            <input type="text" id="filtPac" placeholder="Buscar ID Paciente..." value="${fPac||''}" class="px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 w-full text-sm outline-none focus:ring-2 focus:ring-blue-500" oninput="renderTodasCitasTable()">
            <input type="text" id="filtMed" placeholder="Buscar ID Médico..." value="${fMed||''}" class="px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 w-full text-sm outline-none focus:ring-2 focus:ring-blue-500" oninput="renderTodasCitasTable()">
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <table class="w-full text-left">
                <thead class="bg-gray-50 dark:bg-gray-900">
                    <tr><th class="p-4 text-sm font-semibold">Fecha/Hora</th><th class="p-4 text-sm font-semibold">Paciente</th><th class="p-4 text-sm font-semibold">Médico</th><th class="p-4 text-sm font-semibold">Estado</th></tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
            <div class="p-4 bg-gray-50 dark:bg-gray-900 flex justify-between items-center text-sm">
                <span>Página ${currentPageCitas} de ${totalPages}</span>
                <div class="flex gap-2">
                    <button onclick="if(currentPageCitas>1){currentPageCitas--; renderTodasCitasTable();}" class="px-3 py-1 bg-white dark:bg-gray-700 border rounded hover:bg-gray-100">Anterior</button>
                    <button onclick="if(currentPageCitas<${totalPages}){currentPageCitas++; renderTodasCitasTable();}" class="px-3 py-1 bg-white dark:bg-gray-700 border rounded hover:bg-gray-100">Siguiente</button>
                </div>
            </div>
        </div>
    `;
}


// ==========================================
// REQ 1: HISTORIAL DE PACIENTES (Cards Grid y Filtros Combinados)
// ==========================================
function loadHistorialesView() {
    renderHistorialesGrid();
}

function renderHistorialesGrid() {
    let filtered = globalData.historiales;
    
    const fPac = document.getElementById('histFiltPac')?.value.toLowerCase();
    const fMed = document.getElementById('histFiltMed')?.value;
    const fDate = document.getElementById('histFiltDate')?.value;

    if(fPac) filtered = filtered.filter(h => h.idPaciente.toLowerCase().includes(fPac));
    if(fMed && fMed !== 'all') filtered = filtered.filter(h => h.idMedico === fMed);
    if(fDate) filtered = filtered.filter(h => h.fecha.split('T')[0] === fDate);

    let cardsHtml = filtered.map(h => `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-bold text-lg text-gray-900 dark:text-white">${h.idPaciente}</h4>
                    <p class="text-xs text-gray-500"><i class="fas fa-calendar-alt mr-1"></i> ${h.fecha.split('T')[0]}</p>
                </div>
                <span class="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded text-xs font-semibold"><i class="fas fa-stethoscope"></i> ${h.idMedico}</span>
            </div>
            <div class="mt-4">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Diagnóstico</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">${h.diagnostico}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tratamiento</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">${h.tratamiento || 'Ninguno'}</p>
            </div>
        </div>
    `).join('');

    if(filtered.length === 0) cardsHtml = `<div class="col-span-full p-10 text-center text-gray-500 bg-white/50 rounded-2xl">No se encontraron historiales.</div>`;

    const medOptions = globalData.medicos.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');

    viewContainer.innerHTML = `
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-5 rounded-2xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100 dark:border-gray-700 sticky top-0 z-10">
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Buscar Paciente</label>
                <input type="text" id="histFiltPac" placeholder="ID de Paciente..." value="${fPac||''}" class="w-full px-4 py-2 border rounded-lg bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600" oninput="renderHistorialesGrid()">
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Médico Tratante</label>
                <select id="histFiltMed" class="w-full px-4 py-2 border rounded-lg bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800" onchange="renderHistorialesGrid()">
                    <option value="all">Todos los médicos</option>
                    ${medOptions}
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha de Consulta</label>
                <input type="date" id="histFiltDate" value="${fDate||''}" class="w-full px-4 py-2 border rounded-lg bg-transparent text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600" onchange="renderHistorialesGrid()">
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${cardsHtml}
        </div>
    `;

    // Reseleccionar valor del select si existía
    if(fMed) document.getElementById('histFiltMed').value = fMed;
}

// ==========================================
// REQ 2: AGENDAR CITA - VISTA DE CALENDARIO
// ==========================================
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function loadCalendarioView() {
    renderCalendario();
}

function renderCalendario() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let daysHtml = '';
    // Empty slots
    for(let x=0; x<firstDayIndex; x++) {
        daysHtml += `<div class="bg-gray-50/50 dark:bg-gray-900/20 p-4 border border-gray-100 dark:border-gray-800 rounded-xl min-h-[100px]"></div>`;
    }
    // Days
    for(let i=1; i<=daysInMonth; i++) {
        const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
        // Count citas this day
        const citasHoy = globalData.citas.filter(c => c.fecha.split('T')[0] === dateStr).length;
        const badgeHtml = citasHoy > 0 ? `<div class="mt-2 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-1 rounded font-semibold text-center">${citasHoy} citas</div>` : '';
        
        daysHtml += `
            <div class="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 rounded-xl min-h-[120px] relative group hover:shadow-md transition-shadow cursor-pointer" onclick="abrirModalAgendar('${dateStr}')">
                <span class="font-bold text-gray-700 dark:text-gray-300">${i}</span>
                <button class="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><i class="fas fa-plus text-xs"></i></button>
                ${badgeHtml}
            </div>
        `;
    }

    viewContainer.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 flex justify-between items-center">
            <h3 class="text-xl font-bold"><i class="fas fa-calendar-alt text-blue-500 mr-2"></i> Calendario de Citas</h3>
            <div class="flex items-center gap-4">
                <button onclick="changeMonth(-1)" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-chevron-left"></i></button>
                <span class="font-bold text-lg w-32 text-center">${monthNames[currentMonth]} ${currentYear}</span>
                <button onclick="changeMonth(1)" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
        <div class="grid grid-cols-7 gap-2 mb-2 text-center font-bold text-gray-500 text-sm">
            <div>Dom</div><div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div>
        </div>
        <div class="grid grid-cols-7 gap-2">
            ${daysHtml}
        </div>

        <!-- MODAL AGENDAR (Oculto por defecto) -->
        <div id="modal-agendar" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center">
            <div class="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
                <button onclick="cerrarModalAgendar()" class="absolute top-4 right-4 text-gray-400 hover:text-red-500"><i class="fas fa-times text-xl"></i></button>
                <h3 class="text-xl font-bold mb-1">Agendar Cita</h3>
                <p id="modal-fecha-txt" class="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-6"></p>
                
                <form id="form-agendar-cal" class="space-y-4">
                    <input type="hidden" id="cal-fecha">
                    
                    <div>
                        <label class="block text-sm font-medium mb-1">Motivo de consulta</label>
                        <input type="text" id="cal-motivo" required class="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    ${rol === 'admin' ? `
                    <div>
                        <label class="block text-sm font-medium mb-1">ID Paciente</label>
                        <input type="text" id="cal-paciente" required class="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    ` : `<input type="hidden" id="cal-paciente" value="${globalData.pacientes[0]?.id}">`}

                    <div>
                        <label class="block text-sm font-medium mb-1">Médico</label>
                        <select id="cal-medico" required class="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" onchange="actualizarHorasDisponibles()">
                            <option value="">Seleccione un médico</option>
                            ${globalData.medicos.map(m => `<option value="${m.id}">${m.nombre} (${m.especialidad})</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">Hora Disponible</label>
                        <select id="cal-hora" required disabled class="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Seleccione médico primero</option>
                        </select>
                        <p id="hora-error" class="text-xs text-red-500 mt-1 hidden"><i class="fas fa-exclamation-circle"></i> No hay horas disponibles para este médico en esta fecha.</p>
                    </div>

                    <button type="submit" id="btn-save-cal" class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all">Confirmar Cita</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('form-agendar-cal')?.addEventListener('submit', async(e) => {
        e.preventDefault();
        const fecha = document.getElementById('cal-fecha').value;
        const horaInicio = document.getElementById('cal-hora').value;
        // Asumimos citas de 30 mins para el MVP
        const [h, m] = horaInicio.split(':');
        let minFin = parseInt(m) + 30;
        let hFin = parseInt(h);
        if(minFin >= 60) { minFin -= 60; hFin += 1; }
        const horaFin = `${String(hFin).padStart(2,'0')}:${String(minFin).padStart(2,'0')}:00`;

        const data = {
            idMedico: document.getElementById('cal-medico').value,
            idPaciente: document.getElementById('cal-paciente').value,
            fecha: fecha,
            horaInicio: horaInicio + ':00',
            horaFin: horaFin
        };

        try {
            const res = await fetch(`${API_URL}/citas`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (res.ok) {
                Swal.fire({ title: 'Éxito', text: 'Cita agendada correctamente', icon: 'success' });
                cerrarModalAgendar();
                await fetchAllData();
                renderCalendario();
            } else {
                Swal.fire({ title: 'Error', text: result.message, icon: 'error' });
            }
        } catch (error) {
            Swal.fire({ title: 'Error de Red', text: error.message, icon: 'error' });
        }
    });
}

window.changeMonth = function(dir) {
    currentMonth += dir;
    if(currentMonth > 11) { currentMonth = 0; currentYear++; }
    if(currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendario();
}

window.abrirModalAgendar = function(fecha) {
    document.getElementById('modal-agendar').classList.remove('hidden');
    document.getElementById('cal-fecha').value = fecha;
    document.getElementById('modal-fecha-txt').textContent = "Para el: " + fecha;
    document.getElementById('cal-medico').value = '';
    document.getElementById('cal-hora').innerHTML = '<option value="">Seleccione médico primero</option>';
    document.getElementById('cal-hora').disabled = true;
    document.getElementById('hora-error').classList.add('hidden');
}

window.cerrarModalAgendar = function() {
    document.getElementById('modal-agendar').classList.add('hidden');
}

window.actualizarHorasDisponibles = function() {
    const idMedico = document.getElementById('cal-medico').value;
    const fecha = document.getElementById('cal-fecha').value;
    const selectHora = document.getElementById('cal-hora');
    const msgError = document.getElementById('hora-error');
    const btnSave = document.getElementById('btn-save-cal');

    if(!idMedico) {
        selectHora.disabled = true;
        selectHora.innerHTML = '<option value="">Seleccione médico primero</option>';
        return;
    }

    const medico = globalData.medicos.find(m => m.id === idMedico);
    // Parsear horario del medico
    let horData = {inicio: "08:00", fin: "17:00"};
    try { if(medico.horarioDisponible) horData = JSON.parse(medico.horarioDisponible); } catch(e){}
    
    // Generar slots de 30 minutos
    let slots = [];
    let startH = parseInt(horData.inicio.split(':')[0]);
    let endH = parseInt(horData.fin.split(':')[0]);
    for(let h=startH; h<endH; h++) {
        slots.push(`${String(h).padStart(2,'0')}:00`);
        slots.push(`${String(h).padStart(2,'0')}:30`);
    }

    // Filtrar citas del medico en esa fecha que estén pendientes o confirmadas
    const citasOcupadas = globalData.citas.filter(c => c.idMedico === idMedico && c.fecha.split('T')[0] === fecha && c.estado !== 'cancelada');
    
    // Eliminar slots ocupados
    citasOcupadas.forEach(c => {
        const horaTxt = c.horaInicio.slice(0,5); // "10:00"
        slots = slots.filter(s => s !== horaTxt);
    });

    selectHora.innerHTML = '';
    if(slots.length === 0) {
        selectHora.disabled = true;
        msgError.classList.remove('hidden');
        btnSave.disabled = true;
        btnSave.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        selectHora.disabled = false;
        msgError.classList.add('hidden');
        btnSave.disabled = false;
        btnSave.classList.remove('opacity-50', 'cursor-not-allowed');
        slots.forEach(s => { selectHora.innerHTML += `<option value="${s}">${s}</option>`; });
    }
}

// Fallbacks para las vistas de Medicos y Pacientes sencillas
function renderTable(headers, contentHtml) {
    let ths = headers.map(h => `<th class="p-4 font-semibold">${h}</th>`).join('');
    return `
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
                    <tr>${ths}</tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                    ${contentHtml}
                </tbody>
            </table>
        </div>
    `;
}

function loadMedicosView() {
    let rowsHtml = globalData.medicos.map(med => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b dark:border-gray-700">
            <td class="p-4 font-medium"><i class="fas fa-user-md text-blue-500 mr-2"></i> ${med.nombre}</td>
            <td class="p-4"><span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">${med.especialidad}</span></td>
            <td class="p-4 text-sm">${med.consultorio}</td>
            <td class="p-4 text-sm text-gray-500">${med.email}</td>
        </tr>
    `).join('');
    viewContainer.innerHTML = `<h3 class="text-xl font-bold mb-4">Directorio Médico</h3>` + renderTable(["Médico", "Especialidad", "Consultorio", "Contacto"], rowsHtml);
}

function loadPacientesView() {
    let rowsHtml = globalData.pacientes.map(pac => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b dark:border-gray-700">
            <td class="p-4 font-medium">${pac.nombre} ${pac.apellido}</td>
            <td class="p-4 text-sm font-mono bg-gray-100 dark:bg-gray-900 rounded inline-block mt-2">${pac.documento}</td>
            <td class="p-4 text-sm">${pac.telefono || 'N/A'}</td>
            <td class="p-4 text-sm text-gray-500">${pac.email}</td>
        </tr>
    `).join('');
    viewContainer.innerHTML = `<h3 class="text-xl font-bold mb-4">Pacientes Registrados</h3>` + renderTable(["Nombre Completo", "Documento", "Teléfono", "Email"], rowsHtml);
}
