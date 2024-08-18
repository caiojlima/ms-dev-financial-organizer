import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesGuard } from "../../guards/admin.guard";

function createMockExecutionContext(user: any): ExecutionContext {
    return {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({ user }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;
  }
  

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;
  
    beforeEach(() => {
      reflector = new Reflector();
      guard = new RolesGuard(reflector);
    });
  
    it('deve permitir acesso se não houver roles necessárias', () => {
      const mockContext = createMockExecutionContext({});
      jest.spyOn(reflector, 'get').mockReturnValue(undefined);
  
      expect(guard.canActivate(mockContext)).toBe(true);
    });
  
    it('deve lançar ForbiddenException se o usuário não tiver uma role', () => {
      const mockContext = createMockExecutionContext({ name: 'Miguel' });
      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
  
      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
    });
  
    it('deve lançar ForbiddenException se o usuário não tiver a role necessária', () => {
      const mockContext = createMockExecutionContext({ role: 'user' });
      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
  
      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
    });
  
    it('deve permitir acesso se o usuário tiver a role necessária', () => {
      const mockContext = createMockExecutionContext({  role: 'admin' } );
      jest.spyOn(reflector, 'get').mockReturnValue(['admin']);
  
      expect(guard.canActivate(mockContext)).toBe(true);
    });
  });