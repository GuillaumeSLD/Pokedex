import { Router } from 'express';
import routerTryCatch from './routerTryCatch.js';
import { getPokemons, getPokemon, getTypes, getType, getTeams, getTeam } from '../controllers/getController.js';
import { createTeam } from '../controllers/postController.js';
import { patchTeam } from '../controllers/patchController.js';
import { deleteTeam } from '../controllers/deleteController.js';
import { putPokemonInTeam } from '../controllers/putController.js';
import { deletePokemonInTeam } from '../controllers/deleteController.js';

const router = Router();

// GET Pokemons
router.get('/pokemons', routerTryCatch(getPokemons));
router.get('/pokemons/:id', routerTryCatch(getPokemon));

// GET Types
router.get('/types', routerTryCatch(getTypes));
router.get('/types/:id', routerTryCatch(getType));

// GET Teams
router.get('/teams', routerTryCatch(getTeams));
router.get('/teams/:id', routerTryCatch(getTeam));

// POST Team
router.post('/teams', routerTryCatch(createTeam));

// PATCH Team
router.patch('/teams/:id', routerTryCatch(patchTeam));

// DELETE Team
router.delete('/teams/:id', routerTryCatch(deleteTeam));

// PUT Pokemon in a team
router.put('/teams/:teamId/pokemons/:pokemonId', routerTryCatch(putPokemonInTeam));

// DELETE Pokemon in a team
router.delete('/teams/:teamId/pokemons/:pokemonId', routerTryCatch(deletePokemonInTeam));

export default router;