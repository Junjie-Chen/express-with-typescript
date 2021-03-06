import { Request, Response } from 'express';
import { controller, get, post, validator } from './decorators';

@controller('/auth')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @validator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email === 'express@typescript.com' && password === 'expresswithtypescript') {
      req.session = { isLoggedIn: true };

      res.redirect('/');
    } else {
      res.send('You provided an invalid email or password.');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;

    res.redirect('/');
  }
}
