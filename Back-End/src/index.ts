import express from 'express';
import animalRouter from './routes/animal.route';
import usuarioRouter from './routes/usuario.route';
import adminRouter from './routes/admin.route';
import adopcionRouter from './routes/adopcion.route';
import historiaExitoRouter from './routes/historiaExito.route';
import donacionRouter from './routes/donacion.route';
import registroMedicoRouter from './routes/registroMedico.route';
import voluntariadoRouter from './routes/voluntariado.route';
import hogarTemporalRouter from './routes/hogarTemporal.route';

const app = express();
app.use(express.json());

app.use('/api/animales', animalRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/administradores', adminRouter);
app.use('/api/adopciones', adopcionRouter);
app.use('/api/historias-exito', historiaExitoRouter);
app.use('/api/donaciones', donacionRouter);
app.use('/api/registros-medicos', registroMedicoRouter);
app.use('/api/voluntariados', voluntariadoRouter);
app.use('/api/hogares-temporales', hogarTemporalRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
