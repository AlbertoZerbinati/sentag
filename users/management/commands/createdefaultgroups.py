from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group, Permission, User


class Command(BaseCommand):
    help = 'Creates the defaul t Admins, Editors and Taggers groups, assigning the specified superuser to all of these groups'

    def add_arguments(self, parser):
        parser.add_argument('superuser', type=str)

    def handle(self, *args, **options):
        superuser_name = options['superuser']
        # make sure the specified user exists
        try:
            user = User.objects.get(username=superuser_name)
        except User.DoesNotExist:
            raise CommandError(
                'Superuser "%s" does not exist' % superuser_name)

        # create the 3 groups with appropriate permissions
        taggers = Group.objects.get_or_create(name='Taggers')[0]

        editors = Group.objects.get_or_create(name='Editors')[0]
        editors.permissions.add(Permission.objects.get(codename="add_logentry"), Permission.objects.get(codename="change_logentry"), Permission.objects.get(codename="delete_logentry"),
                                Permission.objects.get(codename="view_logentry"), Permission.objects.get(
                                    codename="add_permission"),
                                Permission.objects.get(codename="change_permission"), Permission.objects.get(
                                    codename="delete_permission"), Permission.objects.get(codename="view_permission"),
                                Permission.objects.get(codename="add_group"), Permission.objects.get(codename="change_group"))

        admins = Group.objects.get_or_create(name='Admins')[0]
        admins.permissions.add(Permission.objects.get(codename="add_logentry"), Permission.objects.get(codename="change_logentry"), Permission.objects.get(codename="delete_logentry"), Permission.objects.get(codename="view_logentry"),
                               Permission.objects.get(codename="add_permission"), Permission.objects.get(codename="change_permission"), Permission.objects.get(
            codename="delete_permission"), Permission.objects.get(codename="view_permission"),
            Permission.objects.get(codename="add_group"), Permission.objects.get(codename="change_group"), Permission.objects.get(
            codename="delete_group"), Permission.objects.get(codename="view_group"), Permission.objects.get(codename="add_user"), Permission.objects.get(codename="change_user"),
            Permission.objects.get(codename="delete_user"), Permission.objects.get(codename="view_user"), Permission.objects.get(
            codename="add_contenttype"), Permission.objects.get(codename="change_contenttype"), Permission.objects.get(codename="delete_contenttype"),
            Permission.objects.get(codename="view_contenttype"), Permission.objects.get(codename="add_session"), Permission.objects.get(
            codename="change_session"), Permission.objects.get(codename="delete_session"), Permission.objects.get(codename="view_session"),
            Permission.objects.get(codename="add_schema"), Permission.objects.get(codename="change_schema"), Permission.objects.get(codename="delete_schema"), Permission.objects.get(
            codename="view_schema"), Permission.objects.get(codename="add_judgment"), Permission.objects.get(codename="change_judgment"),
            Permission.objects.get(codename="delete_judgment"), Permission.objects.get(codename="view_judgment"), Permission.objects.get(
            codename="add_profile"), Permission.objects.get(codename="change_profile"), Permission.objects.get(codename="delete_profile"),
            Permission.objects.get(codename="view_profile"), Permission.objects.get(codename="add_tagging"), Permission.objects.get(codename="change_tagging"), Permission.objects.get(codename="delete_tagging"), Permission.objects.get(codename="view_tagging"))

        # add the superuser to the 3 groups
        taggers.user_set.add(user)
        editors.user_set.add(user)
        admins.user_set.add(user)

        self.stdout.write(self.style.SUCCESS('Success!'))
