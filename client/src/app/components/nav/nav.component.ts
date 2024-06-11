import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherList,
  featherUsers,
  featherMenu,
  featherX,
  featherLogOut,
} from '@ng-icons/feather-icons';
import {
  heroSquares2x2,
  heroRectangleStack,
} from '@ng-icons/heroicons/outline';
import { UserResponse } from '@interfaces/api';
import { UsersService } from '@services/users.service';
import { url } from 'gravatar';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIconComponent],
  providers: [provideIcons({ featherMenu, featherX, featherLogOut })],
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  active = true;
  user!: UserResponse;

  routes = [
    {
      label: 'Inicio',
      url: '/',
      icon: heroSquares2x2,
    },
    {
      label: 'Usuarios',
      url: '/users',
      icon: featherUsers,
    },
    {
      label: 'Cursos',
      url: '/courses',
      icon: heroRectangleStack,
    },
    {
      label: 'Grados',
      url: '/grades',
      icon: featherList,
    },
  ];

  constructor(
    private usersService: UsersService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.usersService.whoami().subscribe((u) => (this.user = u));
  }

  getAvatarUrl() {
    return url(this.user.email, {
      size: '48',
    });
  }

  toggleActive() {
    this.active = !this.active;
  }

  logOut() {
    this.session.signOut();
  }
}
