import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const RULES_PAGE = {
  pt: {
    title: 'Rules',
    description:
      'Rules controla permissão em nível de rota. Rotas com rule são protegidas pelo RouteAccessGuard, que checa as permissões do usuário logado.',
    sections: {
      installation: {
        title: 'Instalação',
        description:
          'Rules é instalado junto com Auth. Use o Koala CLI para adicionar autenticação e permissões de rota.',
      },
      api: {
        title: 'API',
        api: {
          types: {
            title: 'Tipos',
            items: [
              {
                name: 'RouteRule',
                description: 'Identificador de permissão (redefina em logged-user.ts).',
              },
              {
                name: 'RouteConfig',
                description: 'Definição de rota com rule, name e iconClass opcionais.',
              },
              {
                name: 'RouteData',
                description: 'Dados em rotas protegidas (name, rule, iconClass, parent).',
              },
            ],
          },
          function: {
            title: 'Função',
            items: [
              {
                name: 'routesRegistre(routes)',
                description: 'Registra rotas e aplica RouteAccessGuard quando há rule.',
              },
            ],
          },
          guardAndModel: {
            title: 'Guard e model',
            items: [
              {
                name: 'RouteAccessGuard',
                description: 'Redireciona para login sem token; checa hasPermission(rule).',
              },
              {
                name: 'LoggedUser.hasPermission(rule)',
                description: 'Valida as rules do usuário. Rule undefined permite acesso.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Uso',
        description: 'Veja também Auth e o block de Login.',
      },
    },
  },
  en: {
    title: 'Rules',
    description:
      "Rules provides route-level permission control. Routes registered with a rule are protected by RouteAccessGuard, which checks the logged user's permissions.",
    sections: {
      installation: {
        title: 'Installation',
        description:
          'Rules is installed together with Auth. Use the Koala CLI to add authentication and route permissions.',
      },
      api: {
        title: 'API',
        api: {
          types: {
            title: 'Types',
            items: [
              {
                name: 'RouteRule',
                description: 'Permission identifier (redefine in logged-user.ts).',
              },
              {
                name: 'RouteConfig',
                description: 'Route definition with optional rule, name, and iconClass.',
              },
              {
                name: 'RouteData',
                description: 'Data on protected routes (name, rule, iconClass, parent).',
              },
            ],
          },
          function: {
            title: 'Function',
            items: [
              {
                name: 'routesRegistre(routes)',
                description: 'Registers routes and applies RouteAccessGuard when rule is set.',
              },
            ],
          },
          guardAndModel: {
            title: 'Guard & Model',
            items: [
              {
                name: 'RouteAccessGuard',
                description: 'Redirects to login without token; checks hasPermission(rule).',
              },
              {
                name: 'LoggedUser.hasPermission(rule)',
                description: 'Validates user rules. Undefined rule allows access.',
              },
            ],
          },
        },
      },
      usage: {
        title: 'Usage',
        description: 'See also Auth and the Login block.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type RulesPageCopy = (typeof RULES_PAGE)[Locale];
