import {AfterRoutesInit} from "@tsed/common";
import {Inject, Injectable} from "@tsed/di";
import {ApolloService} from "@tsed/apollo";
import {ApolloServer} from "apollo-server-express";

@Injectable()
export class UsersService implements AfterRoutesInit {
  @Inject()
  private apolloService: ApolloService;
  // or private typeGraphQLService: TypeGraphQLService;

  private server: ApolloServer;

  $afterRoutesInit() {
    this.server = this.apolloService.get("server1");
    if (!this.server) {
      throw new Error("Server instance 'server1' not found");
    }
  }
}
